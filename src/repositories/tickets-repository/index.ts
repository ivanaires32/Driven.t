import { Enrollment, Ticket, TicketType } from "@prisma/client";
import { connectDb } from "../../config";


async function getTicketsTypes(): Promise<TicketType[]> {
    const tickets = await connectDb().ticketType.findMany()
    return tickets
}

async function enrollment(id: number) {
    const cadastro = await connectDb().enrollment.findMany({
        where: {
            userId: id
        }
    })
    console.log(cadastro)

    if (cadastro.length === 0) {
        return "Primeiro faça o cadastro"
    }
}



async function postTicketUser(idUser: number, idTicketType: number) {
    await enrollment(idUser)
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
    postTicketUser
}