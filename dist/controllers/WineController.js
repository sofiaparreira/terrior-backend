"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWine = createWine;
exports.findWineById = findWineById;
exports.getAllWines = getAllWines;
exports.deleteWine = deleteWine;
exports.updateWine = updateWine;
const Wine_1 = require("../models/Wine");
const logger_1 = __importDefault(require("../config/logger"));
async function createWine(req, res) {
    try {
        const data = req.body;
        const wine = await Wine_1.WineModel.create(data);
        return res.status(200).json(wine);
    }
    catch (error) {
        logger_1.default.error(`Erro ao criar vinho: ${error.message}`);
        return res.status(500).json({ error: "Erro ao criar anuncio, contate o suporte" });
    }
}
async function findWineById(req, res) {
    try {
        const id = req.params.id;
        const wine = await Wine_1.WineModel.findById(id);
        if (!wine) {
            return res.status(404).json({ error: "Vinho não encontrado" });
        }
        res.status(200).json(wine);
    }
    catch (error) {
        logger_1.default.error(`Erro no sistema: ${error.message}`);
        return res.status(500).json({ error: "Erro ao buscar anuncio, contate o suporte" });
    }
}
async function getAllWines(req, res) {
    try {
        const wines = await Wine_1.WineModel.find();
        if (!wines) {
            return res.status(404).json({ message: "Você não tem nenhum vinho cadastrado" });
        }
        return res.status(200).json(wines);
    }
    catch (e) {
        logger_1.default.error(`Erro no sistema: ${e.message}`);
        return res.status(500).json({ error: "Erro ao buscar anuncios, contate o suporte" });
    }
}
async function deleteWine(req, res) {
    try {
        const id = req.params.id;
        const wine = await Wine_1.WineModel.findById(id);
        if (!wine) {
            return res.status(404).json({ error: "Anúncio não encontrado" });
        }
        await wine.deleteOne();
        res.status(200).json({ message: "Anúncio excluido com sucesso" });
    }
    catch (e) {
        logger_1.default.error(`Erro no sistema: ${e.message}`);
        return res.status(500).json({ error: "Erro ao excluir anuncio, contate o suporte" });
    }
}
async function updateWine(req, res) {
    try {
        const data = req.body;
        const id = req.params.id;
        const wine = await Wine_1.WineModel.findById(id);
        if (!wine) {
            return res.status(404).json({ message: "Anúncio não encontrado" });
        }
        await Wine_1.WineModel.updateOne({ _id: id }, data);
        return res.status(200).json(data);
    }
    catch (error) {
    }
}
