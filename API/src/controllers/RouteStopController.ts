import * as express from "express";
import { getRepository } from "typeorm";
import HttpException from "../exceptions/HttpException";
import {RouteStop} from "../models/entities/routestop.entity";
import {StationStatus} from "../models/entities/stationstatus.entity";
import IRouteStop from "../models/interfaces/routestop.interface";
import IStationStatus from "../models/interfaces/stationstatus.interface";

// todo: separate biz logic into service
class RouteStopController {

    public path = "/route-stop";
    public router = express.Router();
    private sStatRepo = getRepository(StationStatus);
    private rStopRepo = getRepository(RouteStop);

    constructor() {
        this.initializeRoutes();
    }

    /**
     * Registers it's own routes into the Express Router
     */
    public initializeRoutes() {
        this.router.get ( `${this.path}s/session/:id`, this.getSessionAddedRouteStops);
        this.router.get(`${this.path}/:id`, this.getRouteStopById);
        this.router.post(`${this.path}`, this.createSessionRouteStop);
      //  this.router.put(this.path, this.addRouteStop);
        this.router.patch(this.path, this.updateRouteStop);
    }

    /**
     * Creates new Route Stop entry and expects the routeId, stationId and highPri
     * @param request
     * @param response
     * @param next
     */
    public createSessionRouteStop =
        async (request: express.Request, response: express.Response, next: express.NextFunction) => {

            const sId: string = request.body.stationId;
            const rId: string = request.body.routeId;
            const highPri: boolean = request.body.highPri;

            const latestRouteStop: IRouteStop = (await this.rStopRepo.find(
                {
                    where: { station_id: sId, route_id: rId },
                    order: { last_updated: "DESC" },
                    take: 1
                }
            ))[0];

            console.log(latestRouteStop);
            const newRouteStop: IRouteStop = new RouteStop();

            // copies last route stop property values to new one
            // this.rStopRepo.merge(newRouteStop, latestRouteStop);
            newRouteStop.driver_id = latestRouteStop.driver_id;
            newRouteStop.region_id = latestRouteStop.region_id;
            newRouteStop.route_id = latestRouteStop.route_id;
            newRouteStop.system_id = latestRouteStop.system_id;
            newRouteStop.station_id = latestRouteStop.station_id;

            // update session-based property values
            newRouteStop.is_completed = false;
            newRouteStop.session_id = request.sessionID;
            newRouteStop.stop_order = highPri ? 0 : latestRouteStop.stop_order;
            newRouteStop.last_updated = new Date();

            // add to db
            const result = await this.rStopRepo.insert(newRouteStop);

            if (result) {
                response.send(newRouteStop);
            } else {
                next(new HttpException(500, "Error persisting station status."));
            }
        }

    public getSessionAddedRouteStops =
        async (request: express.Request, response: express.Response, next: express.NextFunction) => {

            //  Due to how the primary keys are being handled in the database, I can't use
            // TypeORM and it's relationship functionality which is making it difficult for me to
            // to get this info in one db call. Will revisit later if time allows.

            let routeId: string = request.params.id;

            // get all incomplete session-assigned route stops
            let routeStops: IRouteStop[] = await this.rStopRepo.find(
                {
                    where: { session_id: request.sessionID, is_completed: false, route_id: routeId },
                    order: { last_updated: "DESC" }
                }
            );

            console.log("Retrieved following RouteStops...");
            console.log(routeStops);
            let sessionStops: any[] = [];

             // for each route stop, get the latest status
            for (let i = 0; i < routeStops.length; i++) {
                let curStop: RouteStop = routeStops[i];

                // we don't care if it's part of the session
                let latestStatus: any;
                latestStatus = await this.sStatRepo.createQueryBuilder("ss")
                    .select(["si.name, ss.*"])
                    .innerJoin("station_information", "si",
                                 "ss.system_id = si.system_id and ss.station_id = si.station_id")
                    .where("ss.station_id = :rsStationId and ss.system_id = :rsSystemId")
                    .setParameter("rsStationId", curStop.station_id)
                    .setParameter("rsSystemId", curStop.system_id)
                    .orderBy("ss.last_reported", "DESC")
                    .take(1)
                    .getRawOne();

                curStop.active_station_status = latestStatus;
                sessionStops.push(curStop);
            }

            console.log(sessionStops);

            if (sessionStops) {
                response.send(sessionStops);
            } else {
                next(new HttpException(404, "No route stops found for this session. Session Id: " + request.sessionID));
            }
        }

    public updateRouteStop =
        async (request: express.Request, response: express.Response, next: express.NextFunction) => {
            const dto: IStationStatus = request.body;
            const result = await this.rStopRepo.save(dto);

            if (result) {
                response.send(result);
            } else {
                next(new HttpException(500, "Error persisting station status."));
                // todo: figure out potential errors and send appropriate codes
            }
        }

    /**
     * @param request
     * @param response
     * @param next
     */
    public getRouteStopById =
        async (request: express.Request, response: express.Response, next: express.NextFunction) => {
            const id: any = request.params.id;
            const rStop: IRouteStop = (await this.rStopRepo.findByIds([id]))[0];

            let sStatus: IStationStatus = (await this.sStatRepo.find(
                {
                    where: { station_id : rStop.station_id, system_id: rStop.system_id },
                    order: { last_reported: "DESC" }
                }
            ))[0];

            rStop.active_station_status = sStatus;

            if (rStop) {
                response.send(rStop);
            } else {
                next(new HttpException(404, id));
            }
        }

}

export default RouteStopController;
