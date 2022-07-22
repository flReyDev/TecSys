const { request, response } = require("express");
const Actividades = require("../models/Actividades");
const ActividadPorItem = require("../models/ActividadPorItem");
const Items = require("../models/Items");
const Materiales = require("../models/Materiales");
const Presupuesto = require("../models/Presupuesto");
const Usuario = require("../models/Usuario");
const ItemsPresupuestados = require('../models/ItemsPresupuestados');

/**
 * Función que permite obtener todos lo registros de presupuestos de la base de datos
 * Ruta: /presupuestos/all
 * @param {request} req 
 * @param {response} res 
 * @returns Json()
 */
const getPresupuestos = async (req = request, res = response)=>{
    try {

        const presupuestos =  await Presupuesto.findAll();
        if(presupuestos.length < 1) res.status(400).json({ errro: 'No existen presupuesto registrados!!' })
        res.status(200).json({presupuestos})

    } catch (error) {
        res.status(400).json({error: error})
    }
}

/**
 * Función que permite obtener un presupuesto en detalle minimo o basicamente el objeto simple
 * Ruta: GET /presupuestos/:id
 * @param {request} req 
 * @param {response} res 
 * @returns Json()
 */
const getPresupuesto = async (req = request, res = response)=>{
    let { id } = req.params;
    try {

        if(Number.isInteger(id * 1) && id != 0 ){

            const presupuesto = await Presupuesto.findByPk(id);
            if(presupuesto.length < 1) return res.status(400).json({error: 'No existen registros con el identificador!!!!!'})
            
            res.status(200).json({presupuesto});

        }else{
            res.status(400).json({ msg: "No existen registros, valida e intenta nuevamente!" });
        }
        
    } catch (error) {
        res.status(400).json({error})
    }
}


/**
 * Controlador de detalle de presupuesto, permite observar los item asignados con susu respectivas actividades
 * Ruta: GET /presupuestos/detail/:id
 * @param {request} req 
 * @param {response} res 
 * @returns Json
 */
const detailPresupuesto = async (req = request, res= response)=>{
    let { id } = req.params;
    try {
        const presupuesto = await Presupuesto.findByPk(id, {
            include: [
                {
                    model: Usuario,
                    attributes: [ 'nombre' ]
                },
                { 
                    model: Items, 
                    include:[ 
                        {
                            model: Actividades,
                            include: [Materiales]
                        }
                    ]
                }
            ]
        })
        if(presupuesto.length < 1) return res.status(404).json({ error:  'No hay registros disponibles con ese identificador, valide e intente nuevamente!!'})
        res.status(200).json({ presupuesto })
    } catch (error) {
        res.status(400).json({error})
    }
}


/**
 * Función que permite crear, registrar un nuevo presupuesto dentro de la base de datos
 * Ruta: POST /presupuestos/create
 * @param {request} req 
 * @param {response} res 
 */
const createPresupuesto = async (req = request, res = response)=>{
    let { referencia, idusuario, descripcion, obs, items } = req.body;

    console.log( referencia );
    try {
        const nuevoPresupuesto = await Presupuesto.create({
            referencia,
            idusuario,
            descripcion,
            obs
        });

        const new_items = await Items.bulkCreate( items );

        await nuevoPresupuesto.addItems(new_items, { through: ActividadPorItem });

        const creado = await nuevoPresupuesto.save();


        res.status(201).json({creado});
    } catch (error) {
        res.status(400).json({error})
    }
}

//actualizar un presupuesto
/**
 * Función que permite actualizar un registro enviando como parametros { referencia, descripcion, obs } y retorna el objeto actualizado
 * Ruta: PUT /presupuestos/update
 * @param {request} req 
 * @param {response} res 
 * @returns Json
 */
const updatePresupuesto = async (req = request, res = response)=>{
    let {id, referencia, descripcion, obs } = req.body;

    try {
        const pre_existente = await Presupuesto.findOne({ where: { id } });
        if(pre_existente.length < 1) return res.status(404).json({ error: 'El registro que intenta actualizar no existe!!' })

        pre_existente.referencia = referencia;
        pre_existente.descripcion = descripcion;
        pre_existente.obs = obs;
        const updated = await pre_existente.save();
        res.status(200).json({ updated })
    } catch (error) {
        res.status(400).json({ error })
    }
}

//Eliminar presupuesto
/**
 * Función que permite elimnar un registro o presupuesto de la base de datos, conociendo el id del registro
 * DELETE /presupuesto/delete/:id
 * @param {request} req 
 * @param {response} res 
 */
const deletePresupuesto = async (req = request, res = response)=>{
    let { id } = req.params;
    try {        
        const del = await Presupuesto.destroy({
            where: {
                id
            }
        })
        res.status(200).json({ del })
    } catch (error) {
        res.status(400).json({ error })
    }
}

module.exports = {
    getPresupuestos,
    getPresupuesto,
    detailPresupuesto,
    createPresupuesto,
    updatePresupuesto,
    deletePresupuesto
}