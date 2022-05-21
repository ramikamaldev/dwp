import { Request, Response, NextFunction } from "express";
import { apiRequest, calculateDistance, buildUrlAndSendRequest, appendDistanceToUser, amalgamateDistanceAndResidingArrays } from "../services/geolocation.service"

export async function getUsers(req: Request, res: Response) {
    const pathname = '/users';
    const geolocUrl = new URL(`${process.env.GEOLOC_URL}${pathname}`);
    const response = await apiRequest(geolocUrl.href);
    return res.status(200).send(response);
}

export async function getUsersWithinLocation(req: Request, res: Response) {
    const pathnameUsers = '/users';
    const getUsersResponse = await buildUrlAndSendRequest(`${process.env.GEOLOC_URL}${pathnameUsers}`);
    const distanceArray: Array<any> = appendDistanceToUser(getUsersResponse);
    let filteredByDistanceToLondon = distanceArray.filter(user => user["distanceFromLondonInMiles"] <= 50);
    const pathnameCities = `/city/London/users`;
    const usersListedInLondon = await buildUrlAndSendRequest(`${process.env.GEOLOC_URL}${pathnameCities}`);
    const residingInAndAroundLondon = amalgamateDistanceAndResidingArrays(usersListedInLondon, filteredByDistanceToLondon);
    return res.status(200).send(residingInAndAroundLondon);
}

export function rootHandler(req: Request, res: Response) {
    return res.status(200).send({ "message": "success" });
}