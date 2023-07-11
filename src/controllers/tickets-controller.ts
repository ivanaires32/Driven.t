import { Request, Response } from "express";
import httpStatus from "http-status";
import { ticketsService } from "../services/tickets-service";
import { AuthenticatedRequest } from "../middlewares";

async function getTicketsTypes(req: AuthenticatedRequest, res: Response) {
    try {
        const tickets = await ticketsService.getTicketsTypes()
        res.status(httpStatus.OK).send(tickets)
    } catch (err) {
        res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR)
    }
}

async function postTicketsUser(req: AuthenticatedRequest, res: Response) {
    const { ticketTypeId } = req.body
    const { userId } = req;
    try {
        const tickets = await ticketsService.postTicketsUser(Number(userId), Number(ticketTypeId))
        res.status(httpStatus.CREATED).send(tickets)
    } catch (err) {
        if (err.name === 'BAD REQUEST') {
            return res.sendStatus(httpStatus.BAD_REQUEST)
        } else if (err.name === 'NotFoundError') {
            return res.sendStatus(httpStatus.NOT_FOUND)
        }
        res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR)
    }
}

async function getTicket(req: AuthenticatedRequest, res: Response) {
    const { userId } = req
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
    getTicket,
}
