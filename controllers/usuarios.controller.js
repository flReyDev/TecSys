const { response, request } = require("express");
const byCrypt = require('bcrypt');
const Area = require("../models/Area");
const Cargo = require("../models/Cargo");
const Usuario = require("../models/Usuario");
const Role = require("../models/Roles");
const { default: ManagerJwt, generateJwt } = require("../utils/ManagerJwt");

/**
 * Función que permite obtener todos los usuarios registrados en el sistema
 * Ruta: GET /users/all
 * @param {request}} req 
 * @param {response} res 
 * @returns Json()
 */
const getUsers = async (req = request, res = response)=>{

    try {
        const usuarios = await Usuario.findAll({
            attributes:{ exclude: ['ultimasession', 'contrasena'] },
            include:[Area,Cargo]
        })
        if(usuarios.length < 1) return res.status(404).json({ error: 'No hay registros!!' })
        res.json({
            usuarios
        })
    } catch (error) {
        res.status(400).json({
            error
        })
    }
}
/**
 * Funcion que permite obtener un usuario por su identificador
 * RUTA: GET /users/:id
 * @param {request} req 
 * @param {response} res 
 * @returns Json()
 */
const getUser = async (req = request, res = response)=>{
    let { id } = req.params;

   try {
        if( Number.isInteger( id * 1 ) && id != 0 ){
            const usuario = await Usuario.findAll({
                attributes:{ exclude: ['ultimasession', 'contrasena'] },
                include:[Area,Cargo,Role],
                where:{id}
            })
            if(!usuario || usuario.length < 1) 
                return res.status(404).json({ error: 'No hay registros!!' })
        
            res.json({ usuario })
        }else{
            res.json({ error: "El registro no encontrado!" })
        }
   } catch (error) {
    res.status(400).json({
        error
     })
   }
}
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
 * Función que permite actualizar un usuario
 * Ruta: PUT /users/update
 * @param {request} req 
 * @param {response} res 
 * @returns Json
 */
const putUser = async (req = request, res = response)=>{
    let {id, nombre, apellido, cargoId, edad, areaId, direccion, telefono, contrasena } = req.body;
   
    try {

        let usuario = await Usuario.findByPk(id);

        if(!usuario) return res.status(404).json({ error: "El usuario que quiere editar no esta disponible!" })

        usuario.nombre      = nombre;
        usuario.apellido    = apellido;
        usuario.cargoId     = cargoId;
        usuario.edad        = edad;
        usuario.areaId      = areaId;
        usuario.direccion   = direccion;
        usuario.telefono    = telefono;

        let updated_user = await usuario.save();

        res.json({
            updated_user
        })
        
    } catch (error) {
        res.status(400).json({
            error
        })
    }
}

/**
 * Función que permite eliminar un usuario
 * Ruta: DELETE /users/delete/:id
 * @param {request} req 
 * @param {response} res 
 * @returns Json
 */
const deleteUser = (req = request, res = response)=>{
    let { id } = req.params;

    try {

        if( Number.isInteger( id*1 ) && id != 0 ){

            const del_user = Usuario.destroy({ where: { id } });

            if( !del_user )
                return res.status(400).json({ error: "No se pudo eliminar el usuario!" })
            
            res.json({
                del_user
            })
        }else{
            res.json({ error: "El registro no puede ser elimando, valida el identificador!" })
        }
    } catch (error) {
        res.json({
            error
        })
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

    let attemps = 1;

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
        

        if( usuario.estado === 0){
            usuario.tiempo_bloqueo  = 0;
            usuario.estado          = 1;
            usuario.intentos        = 0;
        }


        let valid_password = byCrypt.compareSync(password, usuario.contrasena);

        if( !valid_password ) {
            usuario.intentos += attemps;
            if(usuario.intentos === 3){
                usuario.tiempo_bloqueo = (new Date().getTime() + 30000);
                usuario.estado = 0;
            }
            await usuario.save();
            return res.status(400).json({ error: "Credenciales incorrectas, valida e intenta nuevamente 2" });
        }

        //generar token 

        await usuario.save();

        let token = await generateJwt( usuario );

        res.json({ token })

    } catch (error) {
        res.status(401).json({
            error
        })
    }
}



module.exports = {
    getUsers,
    getUser,
    register,
    putUser,
    deleteUser,
    login
}




