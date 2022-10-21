const {check} = require('express-validator')

module.exports = [

    check('name')
        .notEmpty().withMessage('El nombre es obligatorio').bail()
        .isLength({
            min : 2
        }).withMessage('Cómo mínimo 2 caracteres'),
 
    check('price')
        .notEmpty().withMessage('El precio es obligatorio').bail()
        .isNumeric({
            no_symbols : true,
        }).withMessage('Debe un número entero positivo'),

        check('discount')
            .isInt({
                min : 0,
                max: 99
            }).withMessage('Los valores de descuento es entre 0 y 99').bail()
            .isNumeric({
                no_symbols : true,
            }).withMessage('Debe ser un número entero positivo'),

        check('height')
            .notEmpty().withMessage('La aultura es obligatoria').bail()
            .isNumeric({
                no_symbols : true,
            }).withMessage('Debe ser un número entero positivo'),

        check('time')
            .notEmpty().withMessage('El tiempo es obligatorio').bail()
            .isNumeric({
                no_symbols : true,
            }).withMessage('Debe ser un número entero positivo'),
            
            check('description')
            .notEmpty().withMessage('La descripción es obligatoria').bail()
            .isLength({
                min : 5,
            }).withMessage('Cómo mínimo 5 caracteres'),

        check('categoryId')
            .notEmpty().withMessage('La categoría es obligatoria'),

        check('materialId')
            .notEmpty().withMessage('El material es obligatorio'),

]