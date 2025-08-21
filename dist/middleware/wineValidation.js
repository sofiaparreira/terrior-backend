"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.wineCreateValidation = void 0;
const express_validator_1 = require("express-validator");
const mongoose_1 = __importDefault(require("mongoose"));
const wineCreateValidation = () => {
    return [
        (0, express_validator_1.body)("name")
            .isString()
            .withMessage("O campo nome é obrigatório")
            .isLength({ min: 5, max: 100 })
            .withMessage("O nome precisa ser entre 5 e 100 caracteres"),
        (0, express_validator_1.body)("type")
            .isString()
            .withMessage("O campo tipo do vinho é obrigatório")
            .isLength({ min: 3, max: 20 })
            .withMessage("O campo tipo do vinho precisa ser entre 3 e 20 caracteres"),
        (0, express_validator_1.body)("grape")
            .isString()
            .withMessage("O campo uva é obrigatório")
            .isLength({ min: 3, max: 50 })
            .withMessage("O campo uva precisa ser entre 3 a 50 caracteres"),
        (0, express_validator_1.body)("year")
            .isNumeric().withMessage("Ano inválido")
            .custom((value) => {
            const currentYear = new Date().getFullYear();
            if (value < 1900 || value > currentYear) {
                throw new Error(`Ano inválido: O valor precisa ser entre 1900 e ${currentYear}`);
            }
            return true;
        }),
        (0, express_validator_1.body)("price")
            .custom((value) => {
            let decimalValue;
            try {
                decimalValue = mongoose_1.default.Types.Decimal128.fromString(value.toString());
            }
            catch (error) {
                throw new Error("Preço inválido");
            }
            const num = parseFloat(decimalValue.toString());
            if (num < 30.0 || num > 10000) {
                throw new Error("O preço deve estar entre R$30,00 e R$10.000,00 ");
            }
            // Verifica 2 casas decimais
            if (!/^\d+(\.\d{1,2})?$/.test(num.toFixed(2))) {
                throw new Error("O preço pode ter no máximo 2 casas decimais");
            }
            return true;
        }),
        (0, express_validator_1.body)("description")
            .isLength({ max: 255 })
            .withMessage("O campo descrição pode ter no máximo 255 caracteres"),
        (0, express_validator_1.body)("volume")
            .isNumeric()
            .withMessage("Valor do volume inválido")
            .isInt({ min: 187, max: 1500 })
            .withMessage("O volume precisa estar entre 187 ml e 1,5 L"),
        (0, express_validator_1.body)("alcoholContent")
            .isNumeric()
            .withMessage("Teor alcoólico inválido")
            .isInt({ min: 5, max: 20 })
            .withMessage("O teor alcoólico precisa estar entre 5% e 20%"),
        (0, express_validator_1.body)("quantity")
            .isNumeric()
            .withMessage("Quantidade inválida")
            .isInt({ min: 1 })
            .withMessage("O valor mínimo da quantidade é 1"),
        (0, express_validator_1.body)("imageUrl")
            .isURL()
            .withMessage("A imagem precisa ser uma URL"),
    ];
};
exports.wineCreateValidation = wineCreateValidation;
