import express from "express";
import { rootHandler, getUsersWithinLocationGeneric } from "../controllers/geolocation.controller"

export function getRouterAndRoutes() {
    const router: express.Router = express.Router();
    router.get("/users/:location", getUsersWithinLocationGeneric);
    router.get("/", rootHandler);
    return router;
}