const { response, request } = require('express');
const Estados = require('../models/Estados');
const Presupuesto = require('../models/Presupuesto');
const Proyectos = require('../models/Proyecto');
const TipoProyectos = require('../models/TipoProyectos');

/**
 * Función que permite obtener todos los proyectos registrados en el sistema
 * Ruta: GET /projects/all
 * @param {request} req 
 * @param {response}} res 
 * @returns Json()
 */
const getProjects = async (req = request, res = response)=>{

    try {
        const proyectos = await Proyectos.findAll({
            include: [
                {
                    model: Estados,
                    attributes: ['descripcion']
                },
                {
                    model: TipoProyectos,
                    attributes: ['descripcion']
                },
                {
                    model: Presupuesto
                }
            ],
            order:[
               ['id', 'DESC']
            ]
        });
        if(!proyectos) return res.status(400).json({ msg: 'No existen proyectos!!!' })
        res.json({proyectos})
    } catch (error) {
        res.status(500).json({error})
    }
}

//Obtener un proyecto con su presupuesto estado del proyecto y tipo
/**
 * Función que permite obtener un proyecto por identificador pasado por URL
 * Ruta: GET /projects/:id
 * @param {request} req 
 * @param {response} res 
 * @returns Json()
 */
const getProject = async (req = request, res = response)=>{

    let { id } = req.params;
    try {
        const proyecto = await Proyectos.findAll({
            where:{
                id
            },
            include: [
                {
                    model: Estados,
                    attributes: ['descripcion']
                },
                {
                    model: TipoProyectos,
                    attributes: ['descripcion']
                },
                {
                    model: Presupuesto
                }
            ]
        });
        if(proyecto.length < 1) return res.status(400).json({ msg: 'No existe el proyecto solicitado, verifica e intenta de nuevo!!' })
        res.json({proyecto})
    } catch (error) {
        res.status(500).json({error})
    }
}

/**
 * Función que permite al creación de un nuevo proyecto
 * Ruta: POST /projects/create
 * @param {*} req 
 * @param {*} res 
 * @param {*} validatorMiddlewares 
 */
const createProject = async (req = request, res = response)=>{
    let { body } = req;
    try {
        const newProject = await (await Proyectos.create(body)).save()
        res.status(201).json({ registro: newProject});
    } catch (error) {
        res.status(500).json({ error })
    }
}


/**
 * Función que permite eliminar un registro de la base de datos, dado un identificador
 * Ruta: DELETE /projects/delete/:id
 * @param {request} req 
 * @param {response} res
 * @returns Json() 
 */
const deleteProject = async (req = request, res = response)=>{
    let { id } = req.params;
    try {
        const del = await Proyectos.destroy({
            where:{
                id
            }
        })
        if(del.length < 1) return res.status(400).json({ error: 'Operación declinada, valida e intenta de nuevo!!' })
        res.status(400).json({ del });
    } catch (error) {
        res.status(400).json({ error })
    }
}

module.exports = {
    getProjects,
    getProject,
    createProject,
    deleteProject
}


