const { request, response } = require("express");
const { msg_jwt }           = require("../helpers/msg");
const { verifyJwt } = require("../utils/ManagerJwt");

/**
 * Función Middleware que valida la auntenticidad del token generado
 * @param {request} req 
 * @param {response} res 
 * @param {next} next 
 */
const token_validator = async (req = request, res = response, next) => {

    try {
        let token = req.headers?.authorization;
        if(!token) throw new Error("No Token")
        token = token.split(" ").pop();
        let { _id, _role } = await verifyJwt( token, process.env.JWT_SECRET );
        req._role = _role;
        next();
    } catch (error) {
        res.status( 401 ).json({ error: msg_jwt( error.message ) })
    }
}

module.exports = {
    token_validator
}