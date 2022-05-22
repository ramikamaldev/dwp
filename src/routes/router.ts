import express from "express";
import { rootHandler, getUsers, getUsersWithinLocation, getUsersWithinLocationGeneric } from "../controllers/geolocation.controller"

export function getRouterAndRoutes() {
    const router: express.Router = express.Router();
    router.get("/getusers/", getUsers)
    router.get("/getuserslocation/", getUsersWithinLocation);
    router.get("/getuserslocations/:location", getUsersWithinLocationGeneric);
    router.get("/", rootHandler);
    return router;
}