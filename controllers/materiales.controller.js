const { request, response } = require("express");
const Materiales = require("../models/Materiales");
const TipoMaterial = require("../models/TipoMaterial");

/**
 * Funcion que recupera todos los materiales 
 * Ruta: GET /material/all
 * @param {request} req 
 * @param {response} res 
 * @returns Json()
 */
const geAlltMateriales = async (req = request, res=response)=>{

   try {
    const materiales = await Materiales.findAll({
        include:[
         { model: TipoMaterial, attributes: ['descripcion'] },
      ],
    })

    if(materiales.length < 1) return res.status(404).json({ error: 'No existen registros disponibles!!!' })
    
    res.status(200).json({ materiales })
   } catch (error) {
    res.status(400).json({error})
   }
}

/**
 * Funcion que recupera un material segun su identificado 
 * Ruta: GET /material/:id
 * @param {request} req 
 * @param {response} res 
 * @returns Json()
 */
const getMaterial = async (req = request, res=response)=>{
    let { id } = req.params;
    try {

      if(Number.isInteger(id*1) && id != 0){
         const materiales = await Materiales.findByPk(id, {
            include:[TipoMaterial]
        })

        if(!materiales) 
               return res.status(404).json({ error: 'No existen el registros solicitado!!!' })
        
        res.status(200).json({ materiales })

      }else{
         res.status(400).json({ msg: "No hay registros, valida e intenta nuevamente!" })
      }
    } catch (error) {
     res.status(400).json({error})
    }
 }


/**
 * Funcion que permite crear un nuevo registro 
 * Ruta: POST /material/create
 * @param {request} req 
 * @param {response} res 
 * @returns Json()
 */
 const postMaterial = async (req = request, res=response)=>{

    let { descripcion, codigo, tipomaterialId, um } = req.body;
    try {
     const materiales = await (await Materiales.create({descripcion, codigo, tipomaterialId, um})).save();
 
     if(materiales.length < 1) return res.status(404).json({ error: 'Error al intentar registrar el nuevo material!!!' })
     
     res.status(200).json({ materiales })
    } catch (error) {
     res.status(400).json({error})
    }
 }

 /**
 * Funcion que permite actualizar un registro  dado el codigo del material 
 * Ruta: PUT /material/update
 * @param {request} req 
 * @param {response} res 
 * @returns Json()
 */
 const updatetMaterial = async (req = request, res=response)=>{

    let {id, descripcion, codigo, tipomaterialId, um } = req.body;
    try {
     const material = await Materiales.findOne({ 
        where:{ 
            id
        }
     })
     material.codigo          = codigo;
     material.descripcion     = descripcion;
     material.tipomaterialId  = tipomaterialId;
     material.um              = um;

     const materialUpdate = await material.save();

     if(materialUpdate.length < 1) return res.status(404).json({ error: 'No se pudo actualizar el registrol!!!' })
     
     res.status(200).json({ materialUpdate })
    } catch (error) {
     res.status(400).json({error})
    }
 }

/**
 * Funcion que permite elimnar un registro 
 * Ruta: DELETE /material/delete/:id
 * @param {request} req 
 * @param {response} res 
 * @returns Json()
 */
 const deleteMaterial = async (req = request, res=response)=>{
    let { id } = req.params;
    try {

      if( Number.isInteger( id * 1 ) && id != 0 ){

         const material = await Materiales.destroy({ where:{id} });

         if(!material) 
            return res.status(404).json({ error: 'No se pudo eliminar el registrol!!!' })

         res.status(200).json({ material })

      }else {
         res.status(200).json({ error: 'No existen registros!' })
      }

    } catch (error) {
     res.status(400).json({error})
    }
 }

module.exports = {
    geAlltMateriales,
    getMaterial,
    postMaterial,
    updatetMaterial,
    deleteMaterial,
}