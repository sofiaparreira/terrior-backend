require("dotenv").config();
import express from "express"
import config from "config"
import db from '../config/db'
import Logger from "../config/logger";
import morganMiddleware from "./middleware/morganMiddleware";
import wineRouter from "./routes/wineRouter";
import userRouter from "./routes/userRouter";
import orderRouter from "./routes/orderRouter";


const app = express();

app.use(express.json());
const port = config.get<number>("port")


app.use(morganMiddleware)
app.use('/api/', wineRouter)
app.use('/api/auth/', userRouter)
app.use('/api/', orderRouter)


app.listen(3000, async () => {
    await db();
    Logger.info(`Aplicação rodando na porta ${port}`);
});