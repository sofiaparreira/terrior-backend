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
        return res.status(500).json({error: "Erro ao criar anuncio, contate o suporte"})
    }
}


export async function findWineById(req: Request, res: Response) {
    try {
        const id = req.params.id;
        const wine = await WineModel.findById(id)

        if(!wine) {
            return res.status(404).json({error: "Vinho não encontrado"})
        }
        res.status(200).json(wine)
    } catch (error: any) {
        Logger.error(`Erro no sistema: ${error.message}`)
        return res.status(500).json({error: "Erro ao buscar anuncio, contate o suporte"})
    }
}


export async function getAllWines(req: Request, res: Response) {
    try {
        const wines = await WineModel.find()
        if(!wines) {
            return res.status(404).json({message: "Você não tem nenhum vinho cadastrado"})
        }
        return res.status(200).json(wines)
    } catch (e: any) {
        Logger.error(`Erro no sistema: ${e.message}`)
        return res.status(500).json({error: "Erro ao buscar anuncios, contate o suporte"})
    }
}

export async function deleteWine(req: Request, res: Response) {
    try {
        
        const id = req.params.id;
        const wine = await WineModel.findById(id)

        if(!wine){
            return res.status(404).json({error: "Anúncio não encontrado"})
        }

        await wine.deleteOne()
        res.status(200).json({message: "Anúncio excluido com sucesso"})

    } catch (e: any) {
        Logger.error(`Erro no sistema: ${e.message}`)
        return res.status(500).json({error: "Erro ao excluir anuncio, contate o suporte"})
    }
}

export async function updateWine(req: Request, res: Response) {
    try {
        
    } catch (error) {
        
    }
}
