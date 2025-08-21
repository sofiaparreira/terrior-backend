"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModel = void 0;
const mongoose_1 = require("mongoose");
const orderSchema = new mongoose_1.Schema({
    user_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "paid", "cancelled"],
        default: "pending",
        required: true,
    },
    total_value: {
        type: mongoose_1.Schema.Types.Decimal128,
        required: true,
    },
    items: [
        {
            wine_id: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: "Wine",
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                min: 1,
            },
            unit_price: {
                type: mongoose_1.Schema.Types.Decimal128,
                required: true,
            },
        },
    ],
}, { timestamps: true });
exports.OrderModel = (0, mongoose_1.model)('Order', orderSchema);
