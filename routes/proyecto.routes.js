const { Router } = require('express');
const { getProjects, getProject, createProject, deleteProject } = require('../controllers/proyecto.controller');
const { body } = require('express-validator');
const { validatorMiddlewares } = require('../middlewares/validator.middleware');


const routerProjects = Router();

routerProjects.get('/all', getProjects);
routerProjects.get('/:id', getProject)
routerProjects.post('/create',
[
    body('nombre', 'El nombre del proyecto debe debe ser superior a 5 caracteres!')
        .isLength({ min: 5 }),
    body('descripcion', 'Descripción requerida, minimo de caracteres 10')
        .isLength({ min: 10}),
    body('inicio_previsto', 'Fecha incorrecta!!')
        .isDate(),
    body('idestado', 'El campo estado, acepta solo numeros!!')
    .isNumeric(),
    body('idpresupuesto', 'Identificador de presupuesto, es requerido y debe ser de tipo numerico!!')
    .isNumeric()
],
validatorMiddlewares,
createProject)
routerProjects.delete('/delete/:id', deleteProject);

module.exports = {
    routerProjects
};
