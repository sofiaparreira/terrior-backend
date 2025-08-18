import { Router } from "express";
import { cartCreateValidation } from "../middleware/cartValidation";
import { validate } from "../middleware/handleValidation";
import { createCart, getCartByUser } from "../controllers/CartController";
import { authenticate } from "../middleware/authMiddleware";

const router = Router()

export default router
    .post('/cart', cartCreateValidation(), validate, createCart)
    .get('/cart', authenticate, getCartByUser)