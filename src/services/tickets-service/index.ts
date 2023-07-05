import { ticketsRepository } from "../../repositories/tickets-repository";

async function getTicketsTypes() {
    const ticketsType = await ticketsRepository.getTicketsTypes()
    return ticketsType
}

function postTicketsUser(idUser: number, idTicketType: number) {
    const ticket = ticketsRepository.postTicketUser(idUser, idTicketType)
    return ticket
}

export const ticketsService = {
    getTicketsTypes,
    postTicketsUser
}
