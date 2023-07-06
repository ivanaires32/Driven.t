import { Request, Response } from "express"
import httpStatus from "http-status"
import { paymentsService } from "../services/payment-service"
import { DataCard } from "../repositories/payments-repository"

async function getPayments(req: Request, res: Response) {
    const { ticketId } = req.query as IdTicket
    const userId = res.locals.userId
    try {
        const result = await paymentsService.getPayments(Number(ticketId), userId)
        res.status(httpStatus.OK).send(result)
    } catch (err) {
        if (err.name === 'NotFoundError') {
            return res.sendStatus(httpStatus.NOT_FOUND)
        }
        res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR)
    }
}

async function postPayments(req: Request, res: Response) {
    const { ticketId, dataCard } = req.body as PostPayment
    const userId = res.locals.userId
    try {
        const payments = await paymentsService.postPayments(ticketId, dataCard, Number(userId))
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
    dataCard: DataCard
}

export const paymentsController = {
    getPayments,
    postPayments
}

type IdTicket = {
    ticketId: string
}