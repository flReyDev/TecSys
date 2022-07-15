const { request, response } = require("express");
const {validationResult} = require('express-validator');

/**
 * Middleware para verificar el express-validator
 * @param {request} req 
 * @param {response} res 
 * @param {next} next 
 * @returns next()
 */
const validatorMiddlewares = (req = request, res = response, next)=>{
        const error = validationResult(req);
        if(!error.isEmpty()) return res.status(400).json({ error: error.array() })

    next();
}
module.exports = {
    validatorMiddlewares
}