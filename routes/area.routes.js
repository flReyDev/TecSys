const { Router } = require("express");
const { body } = require("express-validator");
const { createArea, getArea } = require("../controllers/area.controller");
const { validatorMiddlewares } = require("../middlewares/validator.middleware");


const routerArea = Router();

routerArea.post('/create',[
    body('nombre', 'Nombre del área es incorrecto')
        .isString()
        .isAlpha()
        .isLength({ min: 5, max: 50 }),
    body('ubicacion', 'Error en el tipo de dato')
        .isString()
        .isLength({ min: 5, max: 40 })
], 
validatorMiddlewares,
createArea);
routerArea.get('/:id',      getArea)

module.exports = routerArea;