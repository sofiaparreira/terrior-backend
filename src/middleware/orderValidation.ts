import { body } from "express-validator";

export const orderCreateValidation = () => {
  return [
    body("status")
      .optional()
      .isIn(["pending", "paid", "cancelled"])
      .withMessage("Status inválido. Deve ser: pending, paid ou cancelled"),

    body("items")
      .isArray({ min: 1 })
      .withMessage("O pedido precisa ter pelo menos um item"),

    body("items.*.wine")
      .notEmpty()
      .withMessage("Cada item precisa ter o ID do vinho"),

    body("items.*.quantity")
      .isInt({ min: 1 })
      .withMessage("A quantidade deve ser no mínimo 1"),

    body("items.*.unit_price")
      .isFloat({ min: 30, max: 10000 })
      .withMessage("O preço deve estar entre R$30,00 e R$10.000,00")
      .custom((value) => {
        if (value === undefined || value === null) {
          throw new Error("Preço inválido");
        }

        const decimals = value.toString().split(".")[1];
        if (decimals && decimals.length > 2) {
          throw new Error("O preço pode ter no máximo 2 casas decimais");
        }
        return true;
      }),
  ];
};
