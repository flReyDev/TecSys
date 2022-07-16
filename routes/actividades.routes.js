const { Router } = require("express");
const { body } = require("express-validator");
const { geAllActividades, getActividad, postActividad, updatedActividad, deleteActividad } = require("../controllers/actividades.controller");
const { validatorMiddlewares } = require("../middlewares/validator.middleware");

const routerActividad = Router();


routerActividad.get('/all',     geAllActividades);
routerActividad.get('/:id',     getActividad);
routerActividad.post('/create',[
    body('descripcion', 'Error en la descripción de la actividad verifica e intenta de nuevo!!')
        .isString()
        .isLength({ min: 10, max: 100 })
],
validatorMiddlewares,
postActividad);
routerActividad.put('/update',[
    body('descripcion', 'Error en la descripción de la actividad verifique e intente de nuevo!!')
        .isString()
        .isLength({ min: 10, max: 100 }),
    body('id', 'El identificador debe ser de tipo numero verifica e intenta nuevamente!')
        .isNumeric()
],
validatorMiddlewares,
updatedActividad);
routerActividad.delete('/delete/:id',[
    body('id', 'El identificador no es valido!!')
        .isNumeric()
], validatorMiddlewares, deleteActividad);

module.exports = routerActividad;