const { response, request } = require("express");
const Area = require("../models/Area");
const Cargo = require("../models/Cargo");
const Usuario = require("../models/Usuario");



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
    const usuario = await Usuario.findAll({
        attributes:{ exclude: ['ultimasession', 'contrasena'] },
        include:[Area,Cargo],
        where:{id}
    })
    if(usuario.length < 1) return res.status(404).json({ error: 'No hay registros!!' })

    res.json({
       usuario
    })
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
const postUser = async (req = request, res = response)=>{
    let { nombre, apellido, cargoId, edad, areaId, direccion, telefono, contrasena } = req.body;

    try {

        const nuevo_usuario = await Usuario.create({
            nombre, apellido, cargoId, edad, areaId, direccion, telefono, contrasena
        });
        const usuario = await nuevo_usuario.save();  
        if( usuario.length < 1 ) return json.status(400).json({ error: 'No se pudo completar la solicitud!!' })

        res.json({
            usuario
        })
    } catch (error) {
        res.status(400).json({ error });
    }
}    


//***********************    Pendiente establecer los metodos de elimnar y actualizar */

//actualiza un registro
const putUser = (req = request, res = response)=>{
    let { id } = req.params;
    let { body } = req;
    res.json({
        msg: 'Actualizando el usuario',
        id,
        body
    })
}
//elimina un usuario
const deleteUser = (req = request, res = response)=>{
    let { id } = req.params;
    res.json({
        msg: 'Eliminando el usuario',
        id
    })
}

module.exports = {
    getUsers,
    getUser,
    postUser,
    putUser,
    deleteUser
}




