require("dotenv").config();
import express from "express"
import config from "config"
import db from '../config/db'
import router from "./routers/router";
import Logger from "../config/logger";
import morganMiddleware from "./middleware/morganMiddleware";


const app = express();

app.use(express.json());
const port = config.get<number>("port")


app.use(morganMiddleware)
app.use('/api/', router)

app.listen(3000, async () => {
    await db();
    Logger.info(`Aplicação rodando na porta ${port}`);
});