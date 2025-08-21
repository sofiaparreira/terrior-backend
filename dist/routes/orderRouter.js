"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const orderValidation_1 = require("../middleware/orderValidation");
const handleValidation_1 = require("../middleware/handleValidation");
const OrderController_1 = require("../controllers/OrderController");
const router = (0, express_1.Router)();
exports.default = router
    .post('/order', (0, orderValidation_1.orderCreateValidation)(), handleValidation_1.validate, OrderController_1.createOrder);
