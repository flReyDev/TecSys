const { Router } = require('express');
const { getProjects, getProject, createProject, deleteProject } = require('../controllers/proyecto.controller');
const { body } = require('express-validator');
const { validatorMiddlewares } = require('../middlewares/validator.middleware');


const routerProjects = Router();

routerProjects.get('/all', getProjects);
routerProjects.get('/:id',[
    body('id', 'Error en el identificador, valida e intenta nuevamente!')
        .custom( (value, { req })=> Number.isInteger( req.params.id * 1 ) ?? value )
], validatorMiddlewares, getProject)

routerProjects.post('/create',
[
    body('nombre', 'El nombre del proyecto debe debe ser superior a 5 caracteres!')
        .isLength({ min: 5, max: 80 }),
    body('descripcion', 'Descripción requerida, minimo de caracteres 10')
        .isLength({ min: 10, max: 255}),
    body('ubicacion', 'Error en la ubicacion del proyecto!')
        .isLength({ min: 10, max: 50 }),
    body('inicio_previsto', 'Fecha incorrecta!!')
        .isDate(),
    body('idtipo', 'Error en el tipo de proyecto!')
        .isNumeric(),
    body('idestado', 'El campo estado, acepta solo numeros!!')
        .isNumeric(),
    body('idpresupuesto', 'Identificador de presupuesto, es requerido y debe ser de tipo numerico!!')
    .isNumeric()
],
validatorMiddlewares,
createProject)

routerProjects.delete('/delete/:id',[
    body('id', 'Error en el identificador, valida e intenta nuevamente!')
        .custom( (value, { req })=> Number.isInteger( req.params.id * 1 ) ?? value )
], validatorMiddlewares, deleteProject);

module.exports = {
    routerProjects
};
