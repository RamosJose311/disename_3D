const { check } = require("express-validator");

module.exports = [
  check("name")
    .notEmpty()
    .withMessage("El nombre es obligatorio").bail()
    .isLength({
            min: 2,
        })
    .withMessage("Cómo mínimo 2 caracteres"),

  check("height")
    .notEmpty()
    .withMessage("La aultura es obligatoria").bail()
    .isNumeric({
            no_symbols: true,
        })
    .withMessage("Debe ser un número entero positivo"),

  check("description")
    .notEmpty()
    .withMessage("La descripción es obligatoria")
    .bail()
    .isLength({
      min: 5,
    })
    .withMessage("Cómo mínimo 5 caracteres"),

  check("categoryId").notEmpty().withMessage("La categoría es obligatoria"),

  check("materialId").notEmpty().withMessage("El material es obligatorio"),
];
