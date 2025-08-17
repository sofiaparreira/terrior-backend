import {Router, Request, Response} from "express"
import { createWine, deleteWine, findWineById, getAllWines, updateWine } from "../controllers/WineController";
import { validate } from '../middleware/handleValidation'
import { wineCreateValidation } from "../middleware/wineValidation";

const router = Router();


export default router
    .get('/test', (req: Request, res: Response) => {
    res.status(200).send('API working');
})
    .post("/wine", wineCreateValidation(), validate, createWine)
    .get("/wine/:id", findWineById)
    .get("/wine", getAllWines)
    .delete("/wine/:id", deleteWine)
    .patch("/wine/:id", wineCreateValidation(), validate, updateWine)