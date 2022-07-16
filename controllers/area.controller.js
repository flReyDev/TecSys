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

        if(  area.length < 1 ) return res.status(400).json({ error: 'No se pudo registrar la solicitud, intenta nuevamente!!!' })
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
       
        if( Number.isInteger( id * 1 ) && id != 0){
            const area = await Area.findByPk(id);
            if(  !area ) return res.status(400).json({ error: 'El registro solicitado no es valido!!!' })
            res.status(200).json({ 
                area
            })
        }else{
            res.status(400).json({ error: "Sin registros disponibles!" })
        }
    } catch (error) {
        res.status(400).json({error})
    }
}

/**
 * Solicitar todo los registros
 * Ruta: GET /area/all
 * @param {request} req 
 * @param {response} res 
 */
 const getAllArea = async (req = request, res = response) =>{
    try {
        const areas = await Area.findAll();

        if(  areas.length < 1 ) return res.status(400).json({ error: 'Sin registros!!!' })
        res.json({ 
            areas
        })
    } catch (error) {
        res.status(400).json({error})
    }
}

/**
 * Actualizar un registro
 * Ruta: PUT /area/update
 * @param {request} req 
 * @param {response} res 
 */
const updateArea = async (req = request, res = response) =>{
    let { nombre, ubicacion, telefono, oficina } = req.body;
    try {
        const area = await Area.findOne({
            where:{
                nombre
            }
        });
        if(  area.length < 1 ) return res.status(400).json({ error: 'El registro solicitado no es valido!!!' })
        area.nombre     = nombre;
        area.ubicacion  = ubicacion;
        area.telefono   = telefono;
        area.oficina    = oficina;
        const update_area = await area.save();
        res.json({ 
            update_area
        })
    } catch (error) {
        res.status(400).json({error})
    }
}

/**
 * Elimina un registro
 * Ruta: DELETE /area/delete/:id
 * @param {request} req 
 * @param {response} res 
 */
 const deleteArea = async (req = request, res = response) =>{
    let { id } = req.params;
    try {

        if( Number.isInteger( id * 1 ) && id != 0 ){
            const area = await Area.destroy({ where:{ id } });
            if(!area) 
                 return res.status(400).json({ error: 'El registro no pudo ser eliminado!!!' })

            res.status(200).json({ area })
        }else{
            res.status(404).json({ error: "El registro no se pudo eliminar!!" });
        }
    } catch (error) {
        res.status(400).json({error})
    }
}


module.exports = {
    createArea,
    getArea,
    updateArea,
    getAllArea,
    deleteArea
}