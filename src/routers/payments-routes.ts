import { Router } from "express";
import { paymentsController } from "../controllers/payments-controller";
import { authenticateToken } from "../middlewares";

const paymentsRouter = Router()

paymentsRouter.get('/', authenticateToken, paymentsController.getPayments)
paymentsRouter.post('/process', authenticateToken, paymentsController.postPayments)

export default paymentsRouter