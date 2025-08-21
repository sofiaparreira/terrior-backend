"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = registerUser;
exports.loginUser = loginUser;
exports.deleteUser = deleteUser;
const User_1 = require("../models/User");
const logger_1 = __importDefault(require("../config/logger"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Cart_1 = require("../models/Cart");
const Order_1 = require("../models/Order");
async function registerUser(req, res) {
    try {
        const { name, email, password, role } = req.body;
        const salt = await bcrypt_1.default.genSalt(10);
        const hashedPassword = await bcrypt_1.default.hash(password, salt);
        const user = await User_1.UserModel.create({
            name,
            email,
            password: hashedPassword,
            role
        });
        return res.status(200).json({
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        });
    }
    catch (e) {
        logger_1.default.error(`Erro ao registrar usuário: ${e.message}`);
        return res.status(500).json({ error: "Erro ao registrar, contate o suporte" });
    }
}
async function loginUser(req, res) {
    try {
        const { email, password } = req.body;
        const user = await User_1.UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "E-mail não encontrado" });
        }
        const isMatch = await bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Senha incorreta" });
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '3h' });
        return res.status(200).json({
            message: "Login realizado com sucesso",
            token,
            user: {
                id: user._id,
                email: user.email,
                role: user.role
            }
        });
    }
    catch (e) {
        logger_1.default.error(`Erro ao fazer login: ${e.message}`);
        return res.status(500).json({ error: "Erro ao fazer login, contate o suporte" });
    }
}
async function deleteUser(req, res) {
    try {
        const id = req.params.id;
        const user = await User_1.UserModel.findById(id);
        if (!user) {
            return res.status(404).json({ error: "Usuário não encontrado" });
        }
        await Cart_1.CartModel.deleteMany({ user_id: id });
        await Order_1.OrderModel.deleteMany({ user_id: id });
        await user.deleteOne();
        return res.status(200).json({ message: "Usuário excluido com sucesso" });
    }
    catch (e) {
        logger_1.default.error(`Erro ao deletar usuário: ${e.message}`);
        return res.status(500).json({ error: "Erro ao deletar usuário, contate o suporte" });
    }
}
