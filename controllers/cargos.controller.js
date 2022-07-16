const { request, response } = require("express");
const Cargo = require("../models/Cargo");

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

/**
 * Solicitar un registro segun identificado
 * Ruta: GET /cargo/all
 * @param {request} req 
 * @param {response} res 
 */
 const getAllCargo = async (req = request, res = response) =>{
    try {
        const cargos = await Cargo.findAll();
        if(  cargos.length < 1 ) return res.status(400).json({ error: 'No hay registros disponibles!!!' })
        res.json({ 
            cargos
        })
    } catch (error) {
        res.status(400).json({error})
    }
}

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
 * Actualizar cargo
 * Ruta: POST /cargo/update
 * @param {request} req 
 * @param {response} res 
 */
 const updateCargo = async (req = request, res = response) =>{
    let { nombre, funciones } = req.body;
    try {
        const new_cargo = await Cargo.findOne({where: {nombre}});

        if( new_cargo.length < 1  ) return res.status(400).json({ error: 'No se pudo registrar la solicitud, intenta nuevamente!!!' })
        new_cargo.nombre = nombre;
        new_cargo.funciones = funciones;
        const updated_cargo = await new_cargo.save();
        res.json({ 
            updated_cargo
        })
    } catch (error) {
        res.status(400).json({error})
    }
}


/**
 * Actualizar cargo
 * Ruta: DELETE /cargo/delete/:id
 * @param {request} req 
 * @param {response} res 
 */
 const deleteCargo = async (req = request, res = response) =>{
    let { id } = req.params;
    try {
        const del_cargo = await Cargo.destroy({where: {id}});
        if( del_cargo.length < 1  ) return res.status(400).json({ error: 'No se pudo registrar la solicitud, intenta nuevamente!!!' })
        res.json({ 
            del_cargo
        })
    } catch (error) {
        res.status(400).json({error})
    }
}



module.exports = {
    createCargo,
    getCargo,
    updateCargo,
    getAllCargo,
    deleteCargo
}