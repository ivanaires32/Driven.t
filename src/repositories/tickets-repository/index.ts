import { Enrollment, Ticket, TicketType } from "@prisma/client";
import { connectDb } from "../../config";


async function getTicketsTypes(): Promise<TicketType[]> {
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
    if (ticket) {
        return ticket
    } else {
        return
    }

}

export const ticketsRepository = {
    getTicketsTypes,
    postTicketUser,
    getTicket
}

type TicketUser = {
    id: number,
    status: string, //RESERVED | PAID
    ticketTypeId: number,
    enrollmentId: number,
    TicketType: {
        id: number,
        name: string,
        price: number,
        isRemote: boolean,
        includesHotel: boolean,
        createdAt: Date,
        updatedAt: Date,
    },
    createdAt: Date,
    updatedAt: Date,
}