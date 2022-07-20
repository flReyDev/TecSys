const { Router } = require("express");
const { body } = require('express-validator');
const { getPresupuesto, getPresupuestos, createPresupuesto, updatePresupuesto, deletePresupuesto, detailPresupuesto } = require("../controllers/presupuesto.controller");
const { validatorMiddlewares } = require("../middlewares/validator.middleware");

const routerPresupuesto = Router();

routerPresupuesto.get('/all', getPresupuestos);
routerPresupuesto.get('/:id',[
    body('id', "El identificador debe ser de tipo numero, valida e intenta nuevamente!")
        .custom( (value, { req })=> Number.isInteger( req.params.id * 1) ?? value)
], validatorMiddlewares, getPresupuesto);
routerPresupuesto.get('/detail/:id', detailPresupuesto)

routerPresupuesto.post('/create',
[
    body('referencia', 'La referencia no es valida  Ejem: TEC-PRE-0000')
        .isString()
        .custom((value)=>value.indexOf('TEC-PRE') === 0)
        .isLength({min: 10, max: 100}),
        body('idusuario', 'El identificador del usuario no es valido!')
            .isNumeric(),
        body('descripcion', 'La descripción no es lo suficientemente descriptiva!!!')
            .isLength({ min: 10, max:100 }),
        body('obs', 'Las observaciones no permiten tener encuenta las condiciones o posibles limitaciones en la ejecución del proyecto!!!!')
         .isLength({ min: 10, max: 200 })
    ],
validatorMiddlewares,
 createPresupuesto);


routerPresupuesto.put('/update',[
    body('referencia', 'La referencia no es valida  Ejem: TEC-PRE-0000')
        .isString()
        .custom((value)=> value.indexOf('TEC-PRE') === 0)
        .isLength({min: 10, max: 100}),
        body('idusuario', 'El identificador del usuario no es valido!')
            .isNumeric(),
        body('descripcion', 'La descripción no es lo suficientemente descriptiva!!!')
            .isLength({ min: 10, max:100 }),
        body('obs', 'Las observaciones no permiten tener encuenta las condiciones o posibles limitaciones en la ejecución del proyecto!!!!')
         .isLength({ min: 10, max: 200 })
    ],
validatorMiddlewares, updatePresupuesto);
routerPresupuesto.delete('/delete/:id',[
    body('id', 'El identificador debe ser de tipo numero, valida e intenta nuevamente!!')
        .custom((value, { req })=>  Number.isInteger(req.params.id*1) ?? value )
], validatorMiddlewares, deletePresupuesto)

module.exports = {
    routerPresupuesto
}