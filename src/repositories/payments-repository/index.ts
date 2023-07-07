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
            ticketId: ticketId
        }
    })

    return payment
}



export const paymentsRepository = {
    getPayments,
    postPayments
}