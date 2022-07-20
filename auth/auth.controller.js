const { response, request } = require('express');
const byCrypt = require('bcrypt');
const { generateJwt, tokenRefresh } = require("../utils/ManagerJwt");
const Usuario = require('../models/Usuario');
const Role = require('../models/Roles');



//crea un registro
/**
 * Función que permite crear un usuario
 * Ruta: POST /users/create
 * @param {request} req 
 * @param {response} res 
 * @returns Json
 */
 const register = async (req = request, res = response)=>{
    let { nombre, apellido, cargoId, edad, areaId, direccion, telefono, contrasena } = req.body;

    try {
        let password = byCrypt.hashSync(contrasena, 10);
        console.log( password );
        const nuevo_usuario = await Usuario.create({
            nombre,
            apellido,
            cargoId,
            edad,
            areaId,
            direccion,
            telefono,
            contrasena: password
        });
        const usuario = await nuevo_usuario.save();  

        if( !usuario ) return json.status(400).json({ error: 'No se pudo completar la solicitud!!' })

        res.json({
            usuario
        })
    } catch (error) {
        res.status(400).json({ error });
    }
}    


/**
 * Función que permite iniciar sessión
 * Ruta: DELETE /users/login
 * @param {request} req 
 * @param {response} res 
 * @returns Json
 */
 const login =async (req = request, res = response)=>{
    let { correo, password } = req.body;

    try {
        const usuario = await Usuario.findOne({
            where:{
                email: correo
            },
            include: Role
        })

        if( !usuario || usuario.length < 1 )
            return res.status(400).json({ error: "Credenciales incorrectas, valida e intenta nuevamente 1" });


        if( usuario.tiempo_bloqueo > (new Date().getTime()) )
            return res.status(401).json({ error: "Tu cuenta a sido bloqueada por seguridad intenta nuevamente en 15 minutos!" })
        

        if( usuario.estado_acceso === 0){
            usuario.tiempo_bloqueo  = 0;
            usuario.estado_acceso   = 1;
        }

        let valid_password = byCrypt.compareSync(password, usuario.contrasena);

        if( !valid_password ) {
            usuario.intentos += 1;
            if(usuario.intentos === 3){
                usuario.tiempo_bloqueo = (new Date().getTime() + 30000);
                usuario.estado_acceso = 0;
                usuario.intentos = 0;
            }
            await usuario.save();
            return res.status(400)
                        .json({ error: "Credenciales incorrectas, valida e intenta nuevamente 2" });
        }
        if( usuario.intentos > 0 ) usuario.intentos = 0;

        await usuario.save();
        //generar token
        let token = await generateJwt( usuario.id, usuario.role.nombre );
        
        //aqui se forma el refresh
        await tokenRefresh( usuario, res );

        res.json({ token })
    } catch (error) {
        res.status(401).json({
            error: ` Error: ${ error } `
        })
    }
}

/**
 * Genera un nuevo token luego de la validación del middleware
 * @param {*} req 
 * @param {*} res 
 */
const validRefreshToken = async ( req = request, res = response)=>{
    try {        
        let { _id, _role } = req;

        let token = await generateJwt(_id, _role );
        res.json({ token })
    } catch (error) {
        res.status( 400 ).json({ error });
    }
}


module.exports = {
    login,
    register,
    validRefreshToken
}