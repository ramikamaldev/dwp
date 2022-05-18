import express, { Request, Response } from "express";
import helmet from "helmet";
import dotenv from "dotenv";
import path from "path";
import { getRouterAndRoutes } from "./routes/router";

class DwpApp {
    private static dwpApp: DwpApp;
    private app: express.Application;
    constructor() {
        dotenv.config({ path: path.resolve(__dirname, `../config/config.env`) })
        this.app = express();
        this.instantiateMiddleware();

        this.instantiateServer();


    }
    public instantiateMiddleware() {
        this.app.use(helmet());
        this.app.use("/api", getRouterAndRoutes());
        this.app.get("/", (req: Request, res: Response) => {
            res.status(200).send({ "message": "success" })
        })
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

const dwpApp = DwpApp.getSingletonApp();