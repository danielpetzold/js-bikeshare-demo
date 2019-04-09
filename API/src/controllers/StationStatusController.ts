import * as express from "express";
import { getManager, getRepository } from "typeorm";
import HttpException from "../exceptions/HttpException";
import {RouteStop} from "../models/entities/routestop.entity";
import {StationStatus} from "../models/entities/stationstatus.entity";
import IRouteStop from "../models/interfaces/routestop.interface";
import IStationStatus from "../models/interfaces/stationstatus.interface";

// todo: separate biz logic into service
class StationStatusController {

    public path = "/station-status";
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
        this.router.get(`${this.path}/:id`, this.getStationStatusById);
        this.router.post(this.path, this.createSessionStatus);
    }

    /**
     * Creates
     * @param request
     * @param response
     * @param next
     */
    public createSessionStatus =
        async (request: express.Request, response: express.Response, next: express.NextFunction) => {

           // update fields of posted session status
            const dto: IStationStatus = request.body;
            dto.id = null;
            dto.last_reported = new Date();
            dto.session_id = request.sessionID;

            // get corresponding route stop and update fields
            const latestRouteStop: IRouteStop = (await this.rStopRepo.find(
                {
                    where: { station_id: dto.station_id, system_id: dto.system_id, session_id : request.sessionID },
                    order: { last_updated: "DESC" },
                    take: 1
                }
            ))[0];

            // console.log(latestRouteStop);
            latestRouteStop.is_completed = true;
            latestRouteStop.last_updated = new Date();

            // persist both
            await this.sStatRepo.insert(dto);
            await this.rStopRepo.save(latestRouteStop); // todo: wrap in transaction

            if (dto) {
                response.send(dto);
            } else {
                next(new HttpException(500, "Error persisting station status."));
                // todo: figure out potential errors and send appropriate codes
            }
        }

    /**
     * Doesn't actually work until we get primary keys implemented.
     * Would introduce quite a bit of complexity to use a 3x composite key.
     * @param request
     * @param response
     * @param next
     */
    public getStationStatusById =
        async (request: express.Request, response: express.Response, next: express.NextFunction) => {
            const id: any = request.params.id;
            const sStat = (await this.sStatRepo.findByIds([id]))[0];
            if (sStat) {
                response.send(sStat);
            } else {
                next(new HttpException(404, id));
            }
        }

}

export default StationStatusController;
