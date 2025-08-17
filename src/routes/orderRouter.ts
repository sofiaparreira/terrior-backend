import { Router } from "express";
import { orderCreateValidation } from "../middleware/orderValidation";
import { validate } from "../middleware/handleValidation";
import { createOrder } from "../controllers/OrderController";

const router = Router();

export default router
    .post('/order', orderCreateValidation(), validate, createOrder)