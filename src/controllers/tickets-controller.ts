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
        if (err.type === 'BAD REQUEST') {
            return res.sendStatus(httpStatus.BAD_REQUEST)
        } else if (err.name === 'NotFoundError') {
            return res.sendStatus(httpStatus.NOT_FOUND)
        }
        res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR)
    }
}


async function getTicket(req: Request, res: Response) {
    const { authorization } = req.headers
    const token = authorization?.replace("Bearer ", "")
    const { userId } = jwt.verify(token, process.env.JWT_SECRET) as JWTPayload
    try {
        const ticket = await ticketsService.getTicket(userId)
        res.status(httpStatus.OK).send(ticket)
    } catch (err) {
        if (err.name === 'NotFoundError') {
            return res.sendStatus(httpStatus.NOT_FOUND)
        }
        res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR)
    }
}

export const ticketsController = {
    getTicketsTypes,
    postTicketsUser,
    getTicket
}

type JWTPayload = {
    userId: number;
};