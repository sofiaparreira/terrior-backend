"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRegisterValidation = void 0;
const express_validator_1 = require("express-validator");
const User_1 = require("../models/User");
const userRegisterValidation = () => {
    return [
        (0, express_validator_1.body)("name")
            .isString()
            .withMessage("O campo nome é obrigatório")
            .isLength({ min: 5, max: 80 })
            .withMessage("O nome deve ter entre 5 e 80 caracteres"),
        (0, express_validator_1.body)("email")
            .isString()
            .withMessage("O campo email é obrigatório")
            .isLength({ min: 6, max: 100 })
            .withMessage("O campo email deve ter entre 6 e 100 caracteres")
            .isEmail()
            .withMessage("E-mail inválido")
            .custom(async (value) => {
            const existingUser = await User_1.UserModel.findOne({ email: value });
            if (existingUser) {
                throw new Error("E-mail já cadastrado");
            }
            return true;
        }),
        (0, express_validator_1.body)("password")
            .isString()
            .withMessage("Senha inválida")
            .isLength({ min: 6 })
            .withMessage("A senha precisa ter no mínimo 6 caracteres"),
        (0, express_validator_1.body)("role")
            .isIn(Object.values(User_1.UserRole))
            .withMessage(`Role inválida. Deve ser: ${Object.values(User_1.UserRole).join(", ")}`)
    ];
};
exports.userRegisterValidation = userRegisterValidation;
