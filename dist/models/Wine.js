"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WineModel = void 0;
const mongoose_1 = require("mongoose");
const wineSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    grape: { type: String, required: true },
    year: { type: Number },
    price: { type: mongoose_1.Schema.Types.Decimal128, required: true },
    pairing: { type: String },
    description: { type: String },
    volume: { type: Number, default: 750 },
    alcoholContent: { type: Number },
    quantity: { type: Number, required: true },
    imageUrl: { type: String }
}, {
    timestamps: true
});
exports.WineModel = (0, mongoose_1.model)('Wine', wineSchema);
