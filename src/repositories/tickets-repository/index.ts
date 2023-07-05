import { Enrollment, Ticket, TicketType } from "@prisma/client";
import { connectDb } from "../../config";


async function getTicketsTypes(): Promise<TicketType[]> {
    const tickets = await connectDb().ticketType.findMany()
    return tickets
}

async function getTicket(userId: number) {
    const ticket = await connectDb().ticket.findFirst({
        include: {
            Enrollment: {
                select: {
                    id: true
                }
            }
        }, where: {
            Enrollment: {
                userId: userId
            }
        }

    })
    return ticket
}

async function postTicketUser(idUser: number, idTicketType: number) {
    const ticket = await connectDb().ticket.create({
        include: {
            TicketType: true
        }, data: {
            TicketType: {
                connect: {
                    id: idTicketType
                }
            }, Enrollment: {
                connect: {
                    userId: idUser
                }
            },
            status: "RESERVED"
        }
    })
    return ticket

}

export const ticketsRepository = {
    getTicketsTypes,
    postTicketUser,
    getTicket
}