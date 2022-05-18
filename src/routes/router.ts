import express from "express";
import { rootHandler } from "../controllers/geolocation.controller"

export function getRouterAndRoutes() {
    const router: express.Router = express.Router();
    router.get("/", rootHandler);
    return router;
}