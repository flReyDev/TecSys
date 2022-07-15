const { request, response } = require("express");
const Area = require("../models/Area");


/**
 * Crear una nueva area dentro de la organización
 * Ruta: POST /area/create
 * @param {request} req 
 * @param {response} res 
 */
const createArea = async (req = request, res = response) =>{
    let { nombre, ubicacion, telefono, oficina } = req.body;
    try {
        const new_area = await Area.create({ nombre, ubicacion, telefono, oficina });
        const area = await new_area.save();

        //if(   ) return res.status(400).json({ error: 'No se pudo registrar la solicitud, intenta nuevamente!!!' })
        res.json({ 
            area
        })
    } catch (error) {
        res.status(400).json({error})
    }
}

/**
 * Solicitar un registro segun identificado
 * Ruta: GET /area/:id
 * @param {request} req 
 * @param {response} res 
 */
 const getArea = async (req = request, res = response) =>{
    let { id } = req.params;
    try {
        const area = await Area.findByPk(id);

        if(  area.length < 1 ) return res.status(400).json({ error: 'El registro solicitado no es valido!!!' })
        res.json({ 
            area
        })
    } catch (error) {
        res.status(400).json({error})
    }
}

module.exports = {
    createArea,
    getArea
}