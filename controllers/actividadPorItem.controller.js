const { response, request } = require("express");
const ActividadPorItem = require('../models/ActividadPorItem');


const getAll = async (req = request, res = response) => {
    try {
        
        let all = await ActividadPorItem.findAll();

        if(!all || all.length < 1) return res.status(201).send({ msg: "No hay registros!" })

        res.json({ all });
    } catch (error) {
        res.status(400).json({ error });
    }
}

const asociar = async (req =  request, res = response) =>{
    let { itemId, actividades } = req.body;
    try {
        
        for (const act of actividades) {
            await (await ActividadPorItem.create({
                itemId,
                actividadId: act.actividadId
            })).save();
        }
        res.status(200).json({ msg: "Asociaciones creadas!" });
    } catch (error) {
        res.status(401).json({ error })        
    }
}

module.exports = {
    asociar,
    getAll
}


