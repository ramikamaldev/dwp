import express from "express";
import helmet from "helmet";
import dotenv from "dotenv";
import path from "path";
import { getRouterAndRoutes } from "./routes/router";

class DwpApp {
    private static dwpApp: DwpApp;
    private app: express.Application;
    constructor() {
        this.app = express();
        this.instantiateMiddleware();
        this.instantiateServer();
        dotenv.config({ path: path.resolve(__dirname, `../config/config.env`) })

    }
    public instantiateMiddleware() {
        this.app.use(helmet());
        this.app.use(getRouterAndRoutes());
    }
    public instantiateServer() {
        this.app.listen(process.env.PORT, () => {
            console.log(`Listening on port ${process.env.PORT}`)
        })
    }

    public static getSingletonApp() {
        if (!DwpApp.dwpApp) {
            DwpApp.dwpApp = new DwpApp();
        }
    }
}

