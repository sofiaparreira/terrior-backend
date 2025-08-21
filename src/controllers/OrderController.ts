import { Request, Response } from "express";
import mongoose from "mongoose";
import { OrderModel } from "../models/Order";
import Logger from "../config/logger";


export async function createOrder(req: Request, res: Response) {
    try {
        const data = req.body;
        const { user_id, items } = data;

        if (!items || items.length === 0) {
            return res.status(400).json({ error: "O pedido precisa ter pelo menos um item" });
        }

        const totalValue = items.reduce((acc: number, item: any) => {
            return acc + item.quantity * item.unit_price;
        }, 0);


        const orderData = {
            user_id,
            status: "pending",
            total_value: mongoose.Types.Decimal128.fromString(totalValue.toFixed(2)),
            items: items.map((item: any) => ({
                wine_id: item.wine_id,
                quantity: item.quantity,
                unit_price: mongoose.Types.Decimal128.fromString(item.unit_price.toFixed(2)),
            }))
        }
        const order = await OrderModel.create(orderData);
        return res.status(200).json(order);

    } catch (error: any) {
        Logger.error(`Erro ao criar pedido: ${error.message}`);
        return res.status(500).json({ error: "Erro ao criar pedido, contate o suporte" });
    }
}
