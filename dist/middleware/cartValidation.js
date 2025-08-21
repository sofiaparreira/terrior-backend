"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartCreateValidation = void 0;
const express_validator_1 = require("express-validator");
const mongoose_1 = __importDefault(require("mongoose"));
const cartCreateValidation = () => {
    return [
        (0, express_validator_1.body)("user_id")
            .notEmpty()
            .withMessage("O campo user_id é obrigatório")
            .custom((value) => {
            if (!mongoose_1.default.Types.ObjectId.isValid(value)) {
                throw new Error("user_id inválido");
            }
            return true;
        }),
        (0, express_validator_1.body)("items")
            .isArray({ min: 1 })
            .withMessage("O pedido precisa ter pelo menos um item"),
        (0, express_validator_1.body)("items.*.wine_id")
            .notEmpty()
            .withMessage("Cada item precisa ter o ID do vinho"),
        (0, express_validator_1.body)("items.*.quantity")
            .isInt({ min: 1 })
            .withMessage("A quantidade deve ser no mínimo 1"),
    ];
};
exports.cartCreateValidation = cartCreateValidation;
