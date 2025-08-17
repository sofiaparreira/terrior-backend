import { Request, Response } from "express";
import { WineModel } from "../models/Wine";
import Logger from "../../config/logger";

export async function createWine(req: Request, res: Response) {
    try {

       const data = req.body;
       const wine = await WineModel.create(data);
       return res.status(200).json(wine);

    } catch (error: any) {
        Logger.error(`Erro ao criar vinho: ${error.message}`)
    }
}
