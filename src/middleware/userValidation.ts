import { body } from "express-validator"
import { UserModel, UserRole } from "../models/User"
import userRouter from "../routes/userRouter";

export const userRegisterValidation = () => {
    return [
        body("name")
            .isString()
            .withMessage("O campo nome é obrigatório")
            .isLength({min: 5, max: 80})
            .withMessage("O nome deve ter entre 5 e 80 caracteres"),
        
        body("email")
            .isString()
            .withMessage("O campo email é obrigatório")
            .isLength({min: 6, max: 100})
            .withMessage("O campo email deve ter entre 6 e 100 caracteres")
            .isEmail()
            .withMessage("E-mail inválido")
            .custom(async (value) => {
                const existingUser = await UserModel.findOne({ email: value});
                if(existingUser) {
                    throw new Error("E-mail já cadastrado");
                }
                return true;
            }),
        
        body("password")
            .isString()
            .withMessage("Senha inválida")
            .isLength({min: 6})
            .withMessage("A senha precisa ter no mínimo 6 caracteres"),
        
        body("role")
            .isIn(Object.values(UserRole))
            .withMessage(`Role inválida. Deve ser: ${Object.values(UserRole).join(", ")}`)
    ]
}