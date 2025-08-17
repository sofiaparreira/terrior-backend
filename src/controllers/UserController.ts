import { Request, Response } from "express";
import { UserModel } from "../models/User";
import Logger from "../../config/logger";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export async function registerUser(req: Request, res: Response) {
    try {
        const { name, email, password, role } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = await UserModel.create({
            name,
            email,
            password: hashedPassword,
            role
        });

        return res.status(200).json({
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        });

    } catch (e: any) {
        Logger.error(`Erro ao registrar usuário: ${e.message}`)
        return res.status(500).json({ error: "Erro ao registrar, contate o suporte" })
    }
}

export async function loginUser(req: Request, res: Response) {
    try {
        const {email, password} = req.body;
        const user = await UserModel.findOne({ email });
        if(!user) {
            return res.status(404).json({error: "E-mail não encontrado"})
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) {
            return res.status(400).json({error: "Senha incorreta"})
        }

        const token = jwt.sign(
            {id: user._id, role: user.role},
            process.env.JWT_SECRET as string,
            {expiresIn: '3h'}
        );

        return res.status(200).json({
            message: "Login realizado com sucesso",
            token,
            user: {
                id: user._id,
                email: user.email,
                role: user.role
            }
        });

    } catch (e: any) {
        Logger.error(`Erro ao fazer login: ${e.message}`)
        return res.status(500).json({ error: "Erro ao fazer login, contate o suporte" })
    }
}