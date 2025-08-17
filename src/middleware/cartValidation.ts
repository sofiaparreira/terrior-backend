import { body } from "express-validator";
import mongoose from "mongoose";

export const cartCreateValidation = () => {
  return [
    body("user_id")
      .notEmpty()
      .withMessage("O campo user_id é obrigatório")
      .custom((value) => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
          throw new Error("user_id inválido");
        }
        return true;
      }),

    body("items")
      .isArray({ min: 1 })
      .withMessage("O pedido precisa ter pelo menos um item"),

    body("items.*.wine_id")
      .notEmpty()
      .withMessage("Cada item precisa ter o ID do vinho"),

    body("items.*.quantity")
      .isInt({ min: 1 })
      .withMessage("A quantidade deve ser no mínimo 1"),


  ];
};
