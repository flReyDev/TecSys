const { Router } = require("express");
const { body } = require("express-validator");
const { geAllActividades, getActividad, postActividad, updatedActividad, deleteActividad } = require("../controllers/actividades.controller");


const routerActividad = Router();


routerActividad.get('/all',     geAllActividades);
routerActividad.get('/:id',     getActividad);
routerActividad.post('/create',[
    body('descripcion', 'Error en la descripción de la actividad verifica e intenta de nuevo!!')
        .isString()
        .isLength({ min: 10 })
], postActividad);
routerActividad.put('/update',          updatedActividad);
routerActividad.delete('/delete/:id',   deleteActividad);

module.exports = routerActividad;