const { response } = require('express');
var jwt = require('jsonwebtoken');
const { msg_jwt } = require('../helpers/msg');

/**
 * Función que permite generar un token de acceso al sistema
 * @param {Model.Usuario} user 
 * @returns Token JWT
 */
const generateJwt = async ( _id, _role )=>{
    try {
        return jwt.sign(
            { 
                _id: _id,
                _role: _role
            }, 
            process.env.JWT_SECRET,
            {
                expiresIn: 60 *15,
                audience: "Client Access",
                issuer: "Tecsys Sas"
            }
        );
    } catch (error) {
        msg_jwt(error);
    }
}

/**
 * Función que permite decodificar un JWT
 * @param {string} token 
 * @returns JWT Decode
 */
const verifyJwt = async ( token ) =>{
    return jwt.verify( token, process.env.JWT_SECRET );
}


//Pendiente por implementar
/**
 * Pendiente implementar el refresh
 * @param {*} _id 
 * @param {*} res 
 */
const tokenRefresh = async ( user, res = response ) =>{

    try {
        const refrehsToken = jwt.sign({ _id: user._id, _role: user.role.nombre }, process.env.JWT_REFRESH, { expiresIn: 60*60 })
        res.cookie("refrehsToken", refrehsToken, {
            httpOnly: true,
            domain: "tecsys.com",
            expires: new Date(Date.now() + 3600)
        })
    } catch (error) {
        res.status(500).json({ error: "Errors Interno!" })
    }

}

module.exports  = {
    generateJwt,
    verifyJwt,
    tokenRefresh
}