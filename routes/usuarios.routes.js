const { Router } = require('express');
const { body } = require('express-validator');
const { getUsers, getUser, putUser, deleteUser} = require('../controllers/usuarios.controller');
const { validRole } = require('../middlewares/RoleValidator.middleware');
const { token_validator } = require('../middlewares/tokenValid.middleware');
const { validatorMiddlewares } = require('../middlewares/validator.middleware');

const routerUsers = Router();

routerUsers.get('/all', 
                token_validator,
                validRole(['Admin', 'Supervisor']),
                getUsers);

routerUsers.get('/:id',[
    body('id', 'Error en el identificador del usuario, valida e intenta nuevamente!')
        .custom( (value, { req })=> Number.isInteger( req.params.id * 1 ) ?? value)
    ],
    validatorMiddlewares,
    token_validator,
     getUser);

routerUsers.put('/update',[
    body('nombre', 'Error en el nombre del usuario, valida e intenta nuevamente!')
        .isString()
        .isAlpha()
        .isLength({ min: 5, max: 50 }),
    body('apellido', 'Error en el apellido, valida e intenta nuevamente!')
        .isString()
        .isLength({ min: 5, max: 50 }),
    body('email', 'Email incorrecto valida e intenta de nuevo!')
        .isEmail(),
    body('cargoId', 'Error en el cargo del usuario!')
        .isNumeric(),
    body('edad', 'Error en el cargo del usuario!')
        .isNumeric(),
    body('areaId', 'Error en el identificador del area!')
        .isNumeric(),
    body('direccion', 'Error en la dirección proporcionada!')
        .isLength({ min: 10, max: 50 }),
    body('telefono', 'Error en el telefono proporcionado para el usuario!!')
        .isNumeric()
        .isLength({ min: 8, max: 12 }),
    body('contrasena', 'Error en la contraseña proporcionado para el usuario!!')
        .isLength({ min: 8 })
    ],
    validatorMiddlewares,
    putUser);

routerUsers.delete('/del/:id',[
    body('id', 'Error en el identificador del usuario, valida e intenta nuevamente!')
        .custom( (value, { req })=> Number.isInteger( req.params.id * 1 ) ?? value)
    ], 
    validatorMiddlewares, 
    deleteUser);


module.exports = {
    routerUsers
};