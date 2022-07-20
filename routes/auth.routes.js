const { Router } = require("express");
const { body } = require('express-validator');
const { register, login, validRefreshToken } = require("../auth/auth.controller");
const tokenRefreshValidator = require("../middlewares/TokenRefreshValidator.middleware");
const { validatorMiddlewares } = require("../middlewares/validator.middleware");

const authRoutes = Router();


authRoutes.post('/register',[
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
],validatorMiddlewares, register);


authRoutes.post('/login', login);

authRoutes.post('/refresh', tokenRefreshValidator, validRefreshToken);


module.exports = authRoutes;