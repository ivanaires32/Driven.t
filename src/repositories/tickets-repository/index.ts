import { Enrollment, Ticket } from "@prisma/client";
import { connectDb } from "../../config";


async function getTicketsTypes() {
    const tickets = await connectDb().ticketType.findMany()
    return tickets
}

async function getTicket(userId: number) {
    const ticket = await connectDb().ticket.findFirst({
        where: {
            Enrollment: {
                userId: userId
            }
        }, include: {
            TicketType: {
                select: {
                    id: true,
                    name: true,
                    price: true,
                    isRemote: true,
                    includesHotel: true,
                    createdAt: true,
                    updatedAt: true
                }
            }
        }

    })
    return ticket
}

async function postTicketUser(userId: number, idTicketType: number) {
    const cadastro = await connectDb().enrollment.findMany({
        where: {
            userId: userId
        }
    })

    if (cadastro.length === 0) return
    const ticket = await connectDb().ticket.create({
        data: {
            status: "PAID",
            TicketType: {
                connect: {
                    id: idTicketType
                }
            },
            Enrollment: {
                connect: {
                    userId: userId
                }
            }
        },
        include: {
            TicketType: {
                select: {
                    id: true,
                    name: true,
                    price: true,
                    isRemote: true,
                    includesHotel: true,
                    createdAt: true,
                    updatedAt: true
                }
            }
        }
    })
    return ticket
}

export const ticketsRepository = {
    getTicketsTypes,
    postTicketUser,
    getTicket
}