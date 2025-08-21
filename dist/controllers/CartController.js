"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCart = createCart;
exports.getCartByUser = getCartByUser;
exports.deleteCartItem = deleteCartItem;
exports.updateCartItemQuantity = updateCartItemQuantity;
const Cart_1 = require("../models/Cart");
const logger_1 = __importDefault(require("../config/logger"));
async function createCart(req, res) {
    try {
        const { user_id, items } = req.body;
        console.log("Recebido no createCart:", req.body);
        if (!user_id || !items) {
            return res.status(404).json({ error: "Id do usuário ou items não encontrado para adicionar no carrinho" });
        }
        const cart = await Cart_1.CartModel.create({ user_id, items });
        return res.status(200).json(cart);
    }
    catch (e) {
        logger_1.default.error(`Erro ao criar pedido: ${e.message}`);
        return res.status(500).json({ error: "Erro ao adicionar ao carrinho, contate o suporte" });
    }
}
async function getCartByUser(req, res) {
    try {
        const userId = req.user.id;
        const cart = await Cart_1.CartModel.findOne({ user_id: userId }).populate("items.wine_id");
        if (!cart) {
            return res.status(404).json({ error: "Usuário não encontrado para acessar os itens do carrinho" });
        }
        return res.status(200).json(cart);
    }
    catch (e) {
        logger_1.default.error(`Erro ao mostrar carrinho: ${e.message}`);
        return res.status(500).json({ error: "Erro ao mostrar ao carrinho, contate o suporte" });
    }
}
async function deleteCartItem(req, res) {
    try {
        const userId = req.user.id;
        const wineId = req.params.id;
        const cart = await Cart_1.CartModel.findOne({ user_id: userId });
        if (!cart) {
            return res.status(404).json({ error: "Usuário não encontrado para acessar os itens do carrinho" });
        }
        cart.items.pull({ wine_id: wineId });
        await cart.save();
        return res.status(200).json(cart);
    }
    catch (e) {
        logger_1.default.error(`Erro ao remover item do carrinho: ${e.message}`);
        return res.status(500).json({ error: "Erro ao remover item do carrinho, contate o suporte" });
    }
}
async function updateCartItemQuantity(req, res) {
    try {
        const userId = req.user.id;
        const wineId = req.params.wineId;
        const { quantity } = req.body;
        if (!quantity || quantity < 1) {
            await deleteCartItem(req, res);
        }
        const cart = await Cart_1.CartModel.findOne({ user_id: userId });
        if (!cart) {
            return res.status(404).json({ error: "Usuário não encontrado, tente fazer login novamnete" });
        }
        const item = cart.items.find((item) => item.wine_id.toString() === wineId);
        if (!item) {
            return res.status(404).json({ error: "Item não encontrado no carrinho" });
        }
        item.quantity = quantity;
        await cart.save();
        return res.status(200).json(cart);
    }
    catch (e) {
        logger_1.default.error(`Erro ao atualizar quantidade no carrinho ${e.message}`);
        return res.status(500).json({ error: "Erro ao atualizar item do carrinho" });
    }
}
