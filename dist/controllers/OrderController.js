"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrder = createOrder;
const mongoose_1 = __importDefault(require("mongoose"));
const Order_1 = require("../models/Order");
const logger_1 = __importDefault(require("../config/logger"));
async function createOrder(req, res) {
    try {
        const data = req.body;
        const { user_id, items } = data;
        if (!items || items.length === 0) {
            return res.status(400).json({ error: "O pedido precisa ter pelo menos um item" });
        }
        const totalValue = items.reduce((acc, item) => {
            return acc + item.quantity * item.unit_price;
        }, 0);
        const orderData = {
            user_id,
            status: "pending",
            total_value: mongoose_1.default.Types.Decimal128.fromString(totalValue.toFixed(2)),
            items: items.map((item) => ({
                wine_id: item.wine_id,
                quantity: item.quantity,
                unit_price: mongoose_1.default.Types.Decimal128.fromString(item.unit_price.toFixed(2)),
            }))
        };
        const order = await Order_1.OrderModel.create(orderData);
        return res.status(200).json(order);
    }
    catch (error) {
        logger_1.default.error(`Erro ao criar pedido: ${error.message}`);
        return res.status(500).json({ error: "Erro ao criar pedido, contate o suporte" });
    }
}
