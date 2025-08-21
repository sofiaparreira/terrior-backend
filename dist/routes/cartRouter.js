"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cartValidation_1 = require("../middleware/cartValidation");
const handleValidation_1 = require("../middleware/handleValidation");
const CartController_1 = require("../controllers/CartController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
exports.default = router
    .post('/cart', (0, cartValidation_1.cartCreateValidation)(), handleValidation_1.validate, CartController_1.createCart)
    .get('/cart', authMiddleware_1.authenticate, CartController_1.getCartByUser)
    .delete('/cart/:id', authMiddleware_1.authenticate, CartController_1.deleteCartItem);
