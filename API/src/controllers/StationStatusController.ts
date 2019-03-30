import * as express from "express";
import { getRepository } from "typeorm";
import HttpException from "../exceptions/HttpException";
import {StationStatus} from "../models/entities/stationstatus.entity";
import IStationStatus from "../models/interfaces/stationstatus.interface";

class StationStatusController {

    public path = "/station-status";
    public router = express.Router();
    private repo = getRepository(StationStatus);

    constructor() {
        this.initializeRoutes();
    }

    /**
     * Registers it's own routes into the Express Router
     */
    public initializeRoutes() {
        this.router.get(`${this.path}/:id`, this.getLatestStationStatusById);
        this.router.post(this.path, this.saveStatus);
    }

    /**
     * Creates or Updates a station_status entry
     * @param request
     * @param response
     * @param next
     */
    public saveStatus =
        async (request: express.Request, response: express.Response, next: express.NextFunction) => {
            const dto: IStationStatus = request.body; // todo: validate
            const result = await this.repo.save(dto);
            if (result) {
                response.send(result);
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
    private getLatestStationStatusById =
        async (request: express.Request, response: express.Response, next: express.NextFunction) => {
            const id = request.params.id;
            const sStat = await this.repo.findOne(id);
            if (sStat) {
                response.send(sStat);
            } else {
                next(new HttpException(404, id));
            }
        }

}

export default StationStatusController;
