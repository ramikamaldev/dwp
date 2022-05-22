import { Request, Response, NextFunction } from "express";
import { apiRequest, buildUrlAndSendRequest, getLocationLatLong, appendDistanceToUsersGeneric, amalgamateDistanceAndResidingArrays } from "../services/geolocation.service"
import { capitaliseFirstLetter } from "../utils/utilityFunctions"

export async function getUsers(req: Request, res: Response) {
    const pathname = '/users';
    const geolocUrl = new URL(`${process.env.GEOLOC_URL}${pathname}`);
    const response = await apiRequest(geolocUrl.href);
    return res.status(200).send(response);
}

export async function getUsersWithinLocationGeneric(req: Request, res: Response) {
    try {
        let location = req.params.location;
        location = capitaliseFirstLetter(location);
        const { lat, lng } = await getLocationLatLong(location);
        const pathnameUsers = '/users';
        const getUsersResponse = await buildUrlAndSendRequest(`${process.env.GEOLOC_URL}${pathnameUsers}`);
        const distanceArray: Array<any> = appendDistanceToUsersGeneric(lat, lng, getUsersResponse);
        let filteredByDistanceToLocation = distanceArray.filter(user => user["distanceFromLocationInMiles"] <= 50);
        const pathnameCities = `/city/${location}/users`;
        const usersListedInLocation = await buildUrlAndSendRequest(`${process.env.GEOLOC_URL}${pathnameCities}`);
        const residingInAndAroundLondon = amalgamateDistanceAndResidingArrays(usersListedInLocation, filteredByDistanceToLocation);
        return res.status(200).send(residingInAndAroundLondon);
    }
    catch (e: any) {
        res.status(500).send({ "message": e.message })
    }

}

export function rootHandler(req: Request, res: Response) {
    return res.status(200).send({ "message": "success" });
}