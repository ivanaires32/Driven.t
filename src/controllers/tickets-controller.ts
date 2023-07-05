import { Request, Response } from "express";
import httpStatus from "http-status";
import { ticketsService } from "../services/tickets-service";
import * as jwt from 'jsonwebtoken';

async function getTicketsTypes(req: Request, res: Response) {
    try {
        const tickets = await ticketsService.getTicketsTypes()
        res.status(httpStatus.OK).send(tickets)
    } catch (err) {
        res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR)
    }
}

async function postTicketsUser(req: Request, res: Response) {
    const { ticketTypeId } = req.body
    const { authorization } = req.headers
    const token = authorization?.replace("Bearer ", "")
    const { userId } = jwt.verify(token, process.env.JWT_SECRET) as JWTPayload
    try {
        const tickets = await ticketsService.postTicketsUser(Number(userId), Number(ticketTypeId))
        res.status(httpStatus.CREATED).send(tickets)
    } catch (err) {
        res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR)
    }
}

export const ticketsController = {
    getTicketsTypes,
    postTicketsUser
}

type JWTPayload = {
    userId: number;
};