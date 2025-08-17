import { Router } from "express";
import { userRegisterValidation } from "../middleware/userValidation";
import { validate } from "../middleware/handleValidation";
import { loginUser, registerUser } from "../controllers/UserController";

const router = Router();

export default router
    .post('/register', userRegisterValidation(), validate, registerUser)
    .post('/login', loginUser)