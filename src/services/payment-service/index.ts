import { notFoundError, unauthorizedError } from "../../errors"
import { badRequest } from "../../errors/bad-resquest-error"
import { DataCard } from "../../protocols"
import { paymentsRepository } from "../../repositories/payments-repository"

async function getPayments(ticketId: number, userId: number) {
    if (!ticketId) throw badRequest()
    const payment = await paymentsRepository.getPayments(ticketId, userId)
    if (!payment) {
        throw unauthorizedError()
    } else if (payment === "NotTicket") {
        throw notFoundError()
    }
    return payment
}

async function postPayments(ticketId: number, dataCard: DataCard, userId: number) {
    if (!ticketId || !dataCard) throw badRequest()
    const payment = await paymentsRepository.postPayments(ticketId, dataCard, userId)
    if (payment === "NotTicket") {
        throw notFoundError()
    } else if (payment === "NotUser") {
        throw unauthorizedError()
    }
    return payment
}

export const paymentsService = {
    getPayments,
    postPayments
}