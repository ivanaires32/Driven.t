import { notFoundError } from "../../errors";
import { ticketsRepository } from "../../repositories/tickets-repository";

async function getTicketsTypes() {
    const ticketsType = await ticketsRepository.getTicketsTypes()
    return ticketsType
}

async function postTicketsUser(idUser: number, idTicketType: number) {
    if (idTicketType === null || idTicketType <= 0 || isNaN(idTicketType)) throw {
        type: 'BAD REQUEST'
    }
    const ticket = await ticketsRepository.postTicketUser(idUser, idTicketType)
    if (!ticket) throw notFoundError()
    return ticket
}

async function getTicket(userId: number) {
    const ticket = await ticketsRepository.getTicket(userId)
    if (ticket === null) throw notFoundError()
    return ticket
}

export const ticketsService = {
    getTicketsTypes,
    postTicketsUser,
    getTicket
}
