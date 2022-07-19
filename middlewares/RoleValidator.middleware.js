const { request, response } = require("express");

/**
 * Función que permite validar los roles de usuarios
 * @param {array} roles 
 * @returns Json() -> netx()
 */
const validRole = (roles = []) => async (req = request,res = response, next) => {
    let { _role } = req;

    if(!_role)
        return res.status(401).json('Debes iniciar sesión en el sistema!')
    if(roles.includes( _role )){
        next();
    }else{
        return res.status(401).json({ error: "No tienes los permisos para ingresar en esta ruta!" })
    }
}
module.exports = {
    validRole
}