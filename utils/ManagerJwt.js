var jwt = require('jsonwebtoken');

/**
 * Función que permite generar un token de acceso al sistema
 * @param {Model.Usuario} user 
 * @returns Token JWT
 */
const generateJwt = async ( user )=>{
    try {
        return jwt.sign(
            { 
                _id: user.id,
                _role: user.role.nombre,
                iat: (new Date().getTime()),
                aud: 'Client access',
                iss: 'TecSys Sas'
            }, 
            process.env.JWT_SECRET, 
            { 
                expiresIn: 60 * 15 
            }
        );
    } catch (error) {
        console.log( error );
    }
}

/**
 * Función que permite decodificar un JWT
 * @param {string} token 
 * @returns JWT Decode
 */
const validateJwt = async ( token ) =>{
    try {
       return jwt.decode( token, process.env.JWT_SECRET );
    } catch (error) {
        let msg = error.message;
        return null;
    }
}

module.exports  = {
    generateJwt,
    validateJwt
}