import {Router, Request, Response} from "express"
import { createWine, findWineById } from "../controllers/WineController";
import { validate } from '../middleware/handleValidation'
import { wineCreateValidation } from "../middleware/wineValidation";

const router = Router();


export default router
    .get('/test', (req: Request, res: Response) => {
    res.status(200).send('API working');
})
    .post("/wine", wineCreateValidation(), validate, createWine)
    .get("/wine/:id", findWineById)