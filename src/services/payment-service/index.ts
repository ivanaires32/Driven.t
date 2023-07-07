import { notFoundError, unauthorizedError } from "../../errors"
import { badRequest } from "../../errors/bad-resquest-error"
import { DataCard, paymentsRepository } from "../../repositories/payments-repository"

async function getPayments(ticketId: number, userId: number) {
    if (!ticketId) throw badRequest()
    const payment = await paymentsRepository.getPayments(ticketId, userId)
    if (payment.length === 0) throw notFoundError()
    else if (payment === "UserNotFound") throw unauthorizedError()
    return payment[0]
}

async function postPayments(ticketId: number, dataCard: DataCard, userId: number) {
    if (!ticketId || !dataCard) throw badRequest()
    const payment = await paymentsRepository.postPayments(ticketId, dataCard, userId)
    if (payment === undefined) {
        throw notFoundError()
    } else if (payment === null) {
        throw unauthorizedError()
    }
    return payment
}

export const paymentsService = {
    getPayments,
    postPayments
}