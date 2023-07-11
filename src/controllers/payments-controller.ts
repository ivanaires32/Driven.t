import { Request, Response } from "express"
import httpStatus from "http-status"
import { paymentsService } from "../services/payment-service"
import { DataCard } from "../protocols"
import { AuthenticatedRequest } from "../middlewares"

async function getPayments(req: AuthenticatedRequest, res: Response) {
    const { ticketId } = req.query as IdTicket
    const { userId } = req
    try {
        const result = await paymentsService.getPayments(Number(ticketId), userId)
        res.status(httpStatus.OK).send(result)
    } catch (err) {
        if (err.name === 'NotFoundError') {
            return res.sendStatus(httpStatus.NOT_FOUND)
        } else if (err.name === 'BAD REQUEST') {
            return res.sendStatus(httpStatus.BAD_REQUEST)
        } else if (err.name === 'UnauthorizedError') {
            return res.sendStatus(httpStatus.UNAUTHORIZED)
        }
        res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR)

    }
}

async function postPayments(req: AuthenticatedRequest, res: Response) {
    const { ticketId, cardData } = req.body as PostPayment
    const { userId } = req
    try {
        const payments = await paymentsService.postPayments(ticketId, cardData, Number(userId))
        res.status(httpStatus.OK).send(payments)
    } catch (err) {
        if (err.name === 'BAD REQUEST') {
            return res.sendStatus(httpStatus.BAD_REQUEST)
        } else if (err.name === 'NotFoundError') {
            return res.sendStatus(httpStatus.NOT_FOUND)
        } else if (err.name === 'UnauthorizedError') {
            return res.sendStatus(httpStatus.UNAUTHORIZED)
        }
        res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR)
    }
}

type PostPayment = {
    ticketId: number,
    cardData: DataCard
}

export const paymentsController = {
    getPayments,
    postPayments
}

type IdTicket = {
    ticketId: string
}