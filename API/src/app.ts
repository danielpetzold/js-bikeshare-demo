import express from "express";
import session from "express-session";
import ErrorMiddleware from "./middleware/error.middleware";

/**
 * The Express.Application class that configures/initializes Express
 */
class App {
    public app: express.Application;
    public port: number;
    public api_path: string;

    /**
     * Ctor
     * @param controllers
     * @param port
     */
    constructor(controllers, port) {
        this.app = express();
        this.port = port;
        this.api_path = process.env.API_PATH || '/';

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
        this.app.use( session( {
            resave: true,
            saveUninitialized: true,
            secret: process.env.SESSION_SECRET
        } ) );
    }

    /**
     * Each controller adds their own relevant routes to Express Router
     * @param controllers
     */
    private initializeControllers(controllers) {
        // all verbs need access to request with session id

        this.app.get(this.api_path, (req, res) => {
            // tests the persistence of session cookie
            if (req.session.page_views) {
                req.session.page_views++;
                res.send("You visited this page " + req.session.page_views +
                    " times. Your session Id: " + req.sessionID);
            } else {
                req.session.page_views = 1;
                res.send("Welcome to this page for the first time! Your session Id: " + req.sessionID);
            }
        });

        this.app.post("/", (req, res) => { });
        this.app.put("/", (req, res) => { });
        this.app.patch("/", (req, res) => { });
        if (this.api_path !== '/') {
            this.app.get("/", (req, res) => { });
        }

        controllers.forEach((controller) => {
            this.app.use(this.api_path, controller.router);
        });
    }
}

export default App;
