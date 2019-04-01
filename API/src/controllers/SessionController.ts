import * as express from "express";
import { Guid } from "guid-typescript";
import HttpException from "../exceptions/HttpException";

class SessionController {
    public path = "/session";
    public router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    public initializeRoutes() {
        this.router.get(this.path, this.getNewSession);
    }

    /**
     * Issues a random session id (Guid)
     * @param request
     * @param response
     * @param next
     */
    public getNewSession =
        async (request: express.Request, response: express.Response, next: express.NextFunction) => {
            try {
                let guid: string = Guid.create().toString();
                guid = guid.replace(/-/g, "");
                response.send(guid);
            } catch (e) {
                next(new HttpException(500, "Error getting session value."));
            }
        }
}

export default SessionController;
