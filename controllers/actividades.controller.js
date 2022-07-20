const { request, response } = require("express");
const Actividades = require('../models/Actividades');
const Materiales = require("../models/Materiales");
const MaterialPorActividad = require("../models/MaterialPorActividad");

/**
 * Funcion que recupera todos los materiales 
 * Ruta: GET /actividad/all
 * @param {request} req 
 * @param {response} res 
 * @returns Json()
 */
const geAllActividades = async (req = request, res=response)=>{
   try {
        
    const actividades = await Actividades.findAll({
        attributes:['id', 'descripcion'],
        include:[ {
            model: Materiales,
            attributes: { exclude: [ 'createdAt', 'updatedAt' ] },
            through: { MaterialPorActividad }
        } ]
    })

    if(actividades.length < 1) return res.status(404).json({ error: 'No existen registros disponibles!!!' })
    
    res.status(200).json({ actividades })
   } catch (error) {
    res.status(400).json({error})
   }
}

/**
 * Funcion que recupera una actividad segun su identificado 
 * Ruta: GET /actividad/:id
 * @param {request} req 
 * @param {response} res 
 * @returns Json()
 */
const getActividad = async (req = request, res=response)=>{
    let { id } = req.params;
    try {
     
      if( Number.isInteger( id * 1 ) && id != 0 ){
         const actividades = await Actividades.findAll({ include:[ {model: Materiales} ], where:{ id }});
         if(!actividades || actividades.length < 1) 
               return res.status(404).json({ error: 'No existen el registros solicitado!!!' })

         res.status(200).json({ actividades })
      }else{
         res.status(200).json({ error: "No hay registros disponibles!!" })
      }
    } catch (error) {
     res.status(400).json({error})
    }
 }


/**
 * Funcion que permite crear un nuevo registro 
 * Ruta: POST /actividad/create
 * @param {request} req 
 * @param {response} res 
 * @returns Json()
 */
 const postActividad= async (req = request, res=response)=>{

    let { descripcion, material } = req.body;
    
    try {
      const actividad = await Actividades.create({ descripcion });
      const materiales = await Materiales.bulkCreate(material);
         await actividad.addMateriales(materiales, 
            { through: { 
               cantidad:      0,  
               valorsiniva:   0,    
               iva:           0,      
               valortotal:    0
             } });
   
      const nueva_actividad = await actividad.save();

      if(nueva_actividad.length < 1) 
            return res.status(400).json({ error: 'La solicitud no se pudo completar!!' }); 
      res.status(200).json({ nueva_actividad })

    } catch (error) {
     res.status(400).json({error})
    }
 }

 /**
 * Funcion que permite actualizar un registro  dado el codigo del material 
 * Ruta: PUT /actividad/update
 * @param {request} req 
 * @param {response} res 
 * @returns Json()
 */
 const updatedActividad = async (req = request, res=response)=>{

    let { id, descripcion} = req.body;
    try {
     const actividad = await Actividades.findOne({ 
        where:{ 
            id
        }
     })
     actividad.descripcion = descripcion;

     const actividadUpdate = await actividad.save();

     if(actividadUpdate.length < 1) return res.status(404).json({ error: 'No se pudo actualizar el registrol!!!' })
     
     res.status(200).json({ actividadUpdate })
    } catch (error) {
     res.status(400).json({error})
    }
 }

/**
 * Funcion que permite elimnar un registro 
 * Ruta: DELETE /actividad/delete/:id
 * @param {request} req 
 * @param {response} res 
 * @returns Json()
 */
 const deleteActividad = async (req = request, res=response)=>{
    let { id } = req.params;
    try {
      if(Number.isInteger( id * 1 ) && id != 0){
         
         const actividad = await Actividades.destroy({ where:{ id } })
         
         if(!actividad) 
               return res.status(404).json({ error: 'No se pudo eliminar el registrol!!!' })

         res.status(200).json({ actividad })
      }else{
         res.status(200).json({ error: "No se encuentra el registro por el identificador!!" })
      }
    } catch (error) {
     res.status(400).json({error})
    }
 }

module.exports = {
    getActividad,
    geAllActividades,
    postActividad,
    updatedActividad,
    deleteActividad
}