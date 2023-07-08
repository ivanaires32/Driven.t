import { connectDb } from "../../config"
import { DataCard } from "../../protocols"

async function getPayments(ticketId: number, userId: number) {
    const ticket = await connectDb().ticket.findFirst({
        where: {
            id: ticketId
        }
    })
    if (!ticket) return "NotTicket"

    const dataPayment = await connectDb().payment.findFirst({
        where: {
            Ticket: {
                Enrollment: {
                    userId
                }
            }
        }
    })
    return dataPayment
}

async function postPayments(ticketId: number, dataCard: DataCard, userId: number) {
    const ticket = await connectDb().ticket.findFirst({
        where: {
            id: ticketId
        }
    })

    if (!ticket) return "NotTicket"

    const userTicket = await connectDb().ticket.findFirst({
        where: {
            Enrollment: {
                userId
            }
        }
    })

    if (!userTicket) return "NotUser"

    const value = await connectDb().ticket.findFirst({
        where: {
            id: ticketId
        }, include: {
            TicketType: {
                select: {
                    price: true
                }
            }
        }
    })

    const payment = await connectDb().payment.create({
        data: {
            cardIssuer: dataCard.issuer,
            cardLastDigits: dataCard.number.slice(-4),
            value: value.TicketType.price,
            ticketId
        }
    })

    await connectDb().ticket.update({
        data: {
            status: "PAID"
        }, where: {
            id: ticketId
        }
    })

    return payment
}



export const paymentsRepository = {
    getPayments,
    postPayments
}