import { Router } from "express";
import { cartCreateValidation } from "../middleware/cartValidation";
import { validate } from "../middleware/handleValidation";
import { createCart } from "../controllers/CartController";

const router = Router()

export default router
    .post('/cart', cartCreateValidation(), validate, createCart)