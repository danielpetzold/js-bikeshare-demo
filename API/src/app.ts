import express from "express";
import ErrorMiddleware from "./middleware/error.middleware";

/**
 * The Express.Application class that configures/initializes Express
 */
class App {
    public app: express.Application;
    public port: number;

    /**
     * Ctor
     * @param controllers
     * @param port
     */
    constructor(controllers, port) {
        this.app = express();
        this.port = port;

        this.initializeMiddleware();
        this.initializeControllers(controllers);
    }

    public listen() {
        this.app.listen(this.port, () => {
        });
    }

    /**
     * Registers Express pipeline middleware to use.
     */
    private initializeMiddleware() {
        // Opt into Middleware Services
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.json());
        this.app.use(ErrorMiddleware);
        // todo: Need to add session-related middleware
    }

    /**
     * Each controller adds their own relevant routes to Express Router
     * @param controllers
     */
    private initializeControllers(controllers) {
        controllers.forEach((controller) => {
            this.app.use("/", controller.router);
        });
    }
}

export default App;
