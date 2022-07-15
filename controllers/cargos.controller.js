const { request, response } = require("express");
const Cargo = require("../models/Cargo");


/**
 * Crear un nuevo cargo dentro de la organización
 * Ruta: POST /cargo/create
 * @param {request} req 
 * @param {response} res 
 */
const createCargo = async (req = request, res = response) =>{
    let { nombre, funciones } = req.body;
    try {
        const new_cargo = await Cargo.create({ nombre, funciones });
        const cargo = await new_cargo.save();

        if( cargo.length < 1  ) return res.status(400).json({ error: 'No se pudo registrar la solicitud, intenta nuevamente!!!' })
        res.json({ 
            cargo
        })
    } catch (error) {
        res.status(400).json({error})
    }
}

/**
 * Solicitar un registro segun identificado
 * Ruta: GET /cargo/:id
 * @param {request} req 
 * @param {response} res 
 */
 const getCargo = async (req = request, res = response) =>{
    let { id } = req.params;
    try {
        const cargo = await Cargo.findByPk(id);
        if(  cargo.length < 1 ) return res.status(400).json({ error: 'El registro solicitado no es valido!!!' })
        res.json({ 
            cargo
        })
    } catch (error) {
        res.status(400).json({error})
    }
}

module.exports = {
    createCargo,
    getCargo
}