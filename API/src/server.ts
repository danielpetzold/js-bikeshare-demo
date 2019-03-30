import "dotenv/config";
import "reflect-metadata";
import { createConnection } from "typeorm";
import App from "./app";
import SessionController from "./controllers/SessionController";
import StationStatusController from "./controllers/StationStatusController";
import config from "./ormconfig";

/**
 * Entry point into application
 */
(async () => {
try {
    const conn: any = await createConnection(config);
    console.log("Connected to the database", conn);
} catch (error) {
    console.log("Error while connecting to the database", error);
    return error;
}

const app = new App(
    [
        new StationStatusController(),
        new SessionController()
    ],
    process.env.API_PORT
);

app.listen();
})();
