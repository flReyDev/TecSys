const { Router } = require("express");
const { body } = require('express-validator');
const { getPresupuesto, getPresupuestos, createPresupuesto, updatePresupuesto, deletePresupuesto, detailPresupuesto } = require("../controllers/presupuesto.controller");
const { validatorMiddlewares } = require("../middlewares/validator.middleware");

const routerPresupuesto = Router();

routerPresupuesto.get('/all', getPresupuestos);
routerPresupuesto.get('/:id', getPresupuesto);
routerPresupuesto.get('/detail/:id', detailPresupuesto)

routerPresupuesto.post('/create',
[
    body('referencia', 'La referencia no es valida  Ejem: TEC-PRE-0000')
        .isString()
        .isLength({min: 10}),
        body('fechaelaboracion', "Error en la fecha valida e intenta nuevamente!!")
            .isDate(),
        body('idusuario', 'El identificador del usuario no es valido!')
            .isNumeric(),
        body('descripcion', 'La descripción no es lo suficientemente descriptiva!!!')
            .isLength({ min: 15 }),
        body('obs', 'Las observaciones no permiten tener encuenta las condiciones o posibles limitaciones en la ejecución del proyecto!!!!')
         .isLength({ min: 15 })
    ],
validatorMiddlewares,
 createPresupuesto);


routerPresupuesto.put('/update', updatePresupuesto);
routerPresupuesto.delete('/delete/:id', deletePresupuesto)

module.exports = {
    routerPresupuesto
}