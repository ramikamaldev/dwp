import { Request, Response, NextFunction } from "express";
import { apiRequest } from "../services/geolocation.service"

export function rootHandler(req: Request, res: Response) {
    return res.status(200).send({ "message": "success" });
}

export async function getUsers(req: Request, res: Response) {
    const response = await apiRequest("https://bpdts-test-app.herokuapp.com/users");
    return res.status(200).send(response);
}