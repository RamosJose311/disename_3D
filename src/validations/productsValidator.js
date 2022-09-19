const {check} = require('express-validator')

module.exports = [

    check('nombre')
        .notEmpty().withMessage('El nombre es obligatorio').bail()
        .isLength({
            min : 2
        }).withMessage('Cómo mínimo 2 caracteres'),

    check('precio')
        .notEmpty().withMessage('El precio es obligatorio').bail()
        .isNumeric({
            no_symbols : true,
        }).withMessage('Debe un número entero positivo'),

        check('descuento')
            .isInt({
                min : 0,
                max: 99
            }).withMessage('Los valores de descuento es entre 0 y 99').bail()
            .isNumeric({
                no_symbols : true,
            }).withMessage('Debe ser un número entero positivo'),

        check('altura')
            .notEmpty().withMessage('La aultura es obligatoria').bail()
            .isNumeric({
                no_symbols : true,
            }).withMessage('Debe ser un número entero positivo'),

        check('tiempo')
            .notEmpty().withMessage('El tiempo es obligatorio').bail()
            .isNumeric({
                no_symbols : true,
            }).withMessage('Debe ser un número entero positivo'),

        check('categoria')
            .notEmpty().withMessage('La categoría es obligatoria'),

        check('material')
            .notEmpty().withMessage('El material es obligatorio'),


        check('descripcion')
            .notEmpty().withMessage('La descripción es obligatoria').bail()
            .isLength({
                min : 5,
            }).withMessage('Cómo mínimo 5 caracteres'),

]