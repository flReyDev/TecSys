const { response, request } = require("express");
const Area = require("../models/Area");
const Cargo = require("../models/Cargo");
const Usuario = require("../models/Usuario");
const Role = require("../models/Roles");


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

module.exports = {
    getUsers,
    getUser,
    putUser,
    deleteUser
}




