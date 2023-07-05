import { Router } from "express";
import { authenticateToken } from "../middlewares";
import { ticketsController } from "../controllers/tickets-controller";

const ticketsRouter = Router()

ticketsRouter.post("/", authenticateToken, ticketsController.postTicketsUser)
ticketsRouter.get("/", authenticateToken, ticketsController.getTicket)
ticketsRouter.get("/types", authenticateToken, ticketsController.getTicketsTypes)

export default ticketsRouter