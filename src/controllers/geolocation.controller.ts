import { Request, Response, NextFunction } from "express";

export function rootHandler(req: Request, res: Response) {
    res.status(200).send({ "message": "success" });
}