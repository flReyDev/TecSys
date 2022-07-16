const { Router } = require("express");
const { body } = require("express-validator");
const { getCargo, createCargo, getAllCargo, updateCargo, deleteCargo } = require("../controllers/cargos.controller");
const { validatorMiddlewares } = require("../middlewares/validator.middleware");


const routerCargo = Router();

routerCargo.get('/all', getAllCargo);
routerCargo.get('/:id', getCargo);
routerCargo.post('/create',[
    body('nombre', 'Error en el nombre del cargo valida e intenta nuevamente!!!!')
        .isString()
        .isLength({ min: 5, max: '50'}),
    body('funciones', 'Error en la descripción de las funciones valida e intenta nuevamente!!!')
        .isString()
        .isLength({ min: 5, max: 100 })
], validatorMiddlewares, createCargo);

routerCargo.put('/update',[
    body('nombre', 'Error en el nombre del cargo valida e intenta nuevamente!!!!')
        .isString()
        .isLength({ min: 5, max: '50'}),
    body('funciones', 'Error en la descripción de las funciones valida e intenta nuevamente!!!')
        .isString()
        .isLength({ min: 5, max: 100 })
], validatorMiddlewares, updateCargo);

routerCargo.delete('/delete/:id', deleteCargo);

module.exports = routerCargo;