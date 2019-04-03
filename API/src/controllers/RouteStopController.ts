import * as express from "express";
import { getRepository } from "typeorm";
import HttpException from "../exceptions/HttpException";
import {StationStatus} from "../models/entities/stationstatus.entity";
import IStationStatus from "../models/interfaces/stationstatus.interface";
import {RouteStop} from "../models/entities/routestop.entity";
import IRouteStop from "../models/interfaces/routestop.interface";

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
        this.router.get(`${this.path}/:id`, this.getRouteStopById);
        this.router.post(this.path, this.addRouteStop);
        this.router.put(this.path, this.updateRouteStop);
    }

    /**
     * Creates or Updates a Route Stop entry
     * @param request
     * @param response
     * @param next
     */
    public addRouteStop =
        async (request: express.Request, response: express.Response, next: express.NextFunction) => {
            const dto: IStationStatus = request.body; // todo: validate
            dto.id = null; // clear out id
            const result = await this.rStopRepo.insert(dto);
            if (result) {
                response.send(result);
            } else {
                next(new HttpException(500, "Error persisting station status."));
                // todo: figure out potential errors and send appropriate codes
            }
        }

    public updateRouteStop =
        async (request: express.Request, response: express.Response, next: express.NextFunction) => {
            const dto: IStationStatus = request.body; // todo: validate
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
            const rStop = await this.rStopRepo.findByIds([id]);
            if (rStop) {
                response.send(rStop);
            } else {
                next(new HttpException(404, id));
            }
        }

}

export default StationStatusController;
