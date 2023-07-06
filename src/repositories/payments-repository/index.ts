import { connectDb } from "../../config"

async function getPayments(ticketId: number, userId: number) {
    const dataPayment = await connectDb().payment.findFirst({
        include: {
            Ticket: {
                include: {
                    Enrollment: {
                        select: {
                            userId: true
                        }
                    }
                }
            }
        }
    })

    return dataPayment
}

async function postPayments(ticketId: number, dataCard: DataCard, userId: number) {
    const ticketUser = await connectDb().ticket.findMany({
        where: {
            Enrollment: {
                userId: userId
            }
        }
    })

    if (ticketUser.length === 0) return null

    const ticket = await connectDb().ticket.findMany({
        where: {
            id: ticketId
        }
    })

    if (ticket.length === 0) return

    const payment = await connectDb().payment.create({
        data: {
            Ticket: {
                connect: {
                    id: ticketId
                }
            }, value: 600,
            cardIssuer: dataCard.issuer,
            cardLastDigits: `${dataCard.number}`
        }
    })

    return payment
}

export type DataCard = {
    issuer: string,
    number: number,
    name: string,
    expirationDate: Date,
    cvv: number
}

export const paymentsRepository = {
    getPayments,
    postPayments
}