import { Request, Response } from "express";
import { CartModel } from "../models/Cart";
import Logger from "../../config/logger";

export async function createCart(req: Request, res: Response) {
    try {
        const {user_id, items} = req.body;
        console.log("Recebido no createCart:", req.body);


        if(!user_id || !items) {
            return res.status(404).json({error: "Id do usuário ou items não encontrado para adicionar no carrinho"})
        }
        
        const cart = await CartModel.create({user_id, items});
        return res.status(200).json(cart);
    } catch (e:any) {
        Logger.error(`Erro ao criar pedido: ${e.message}`);
        return res.status(500).json({ error: "Erro ao adicionar ao carrinho, contate o suporte" });
    }
}