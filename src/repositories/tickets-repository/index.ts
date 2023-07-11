import { connectDb } from "../../config";


async function getTicketsTypes() {
    const tickets = await connectDb().ticketType.findMany()
    return tickets
}

async function getTicket(userId: number) {
    const ticket = await connectDb().ticket.findFirst({
        where: {
            Enrollment: {
                userId
            }
        }, include: {
            TicketType: true
        }

    })
    return ticket
}

async function postTicketUser(userId: number, idTicketType: number) {
    const cadastro = await connectDb().enrollment.findMany({
        where: {
            userId
        }
    })

    if (cadastro.length === 0) return
    const ticket = await connectDb().ticket.create({
        data: {
            status: "RESERVED",
            TicketType: {
                connect: {
                    id: idTicketType
                }
            },
            Enrollment: {
                connect: {
                    userId
                }
            }
        },
        include: {
            TicketType: true
        }
    })
    return ticket
}

export const ticketsRepository = {
    getTicketsTypes,
    postTicketUser,
    getTicket
}