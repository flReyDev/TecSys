const { Router, request, response } = require("express");
const { body } = require("express-validator");
const { createArea, getArea, getAllArea, updateArea, deleteArea } = require("../controllers/area.controller");
const { validatorMiddlewares } = require("../middlewares/validator.middleware");


const routerArea = Router();

routerArea.get('/all', getAllArea);
routerArea.get('/:id',[
    body('id', 'Error en el identificador!')
        .custom( ( value, { req } )=>  Number.isInteger( req.params.id * 1 ) ?? value )
], validatorMiddlewares, getArea);

routerArea.post('/create',[
    body('nombre', 'Nombre del área es incorrecto')
        .isString()
        .isLength({ min: 5, max: 50 }),
    body('ubicacion', 'Error en el tipo de dato')
        .isString()
        .isLength({ min: 5, max: 40 }),
    body('telefono', 'Numero de telefono errado intenta nuevamente!!')
        .isNumeric()
        .isLength({ min: 7, max: 10 }),
    body('oficina', 'Error en la definición de oficina!')
        .isString()
        .isLength({ min: 4, max: 10 })
], 
validatorMiddlewares,
createArea);

routerArea.put('/update',[
    body('nombre', 'Nombre del área es incorrecto')
        .isString()
        .isAlpha()
        .isLength({ min: 5, max: 50 }),
    body('ubicacion', 'Error en el tipo de dato')
        .isString()
        .isLength({ min: 5, max: 40 }),
    body('telefono', 'Numero de telefono errado intenta nuevamente!!')
        .isNumeric()
        .isLength({ min: 7, max: 10 }),
    body('oficina', 'Error en la definición de oficina!')
        .isString()
        .isLength({ min: 4, max: 10 })
], validatorMiddlewares, updateArea);

routerArea.delete('/delete/:id',[
    body('id', 'Identificador no valido!!')
        .custom( (value, { req })=> Number.isInteger( req.params.id * 1 ) ?? value)
], validatorMiddlewares, deleteArea);


module.exports = routerArea;