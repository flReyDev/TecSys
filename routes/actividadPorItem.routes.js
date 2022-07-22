const { Router } = require("express");
const { asociar, getAll } = require("../controllers/actividadPorItem.controller");


const routesActividadPorItem = Router();

routesActividadPorItem.post('/create', asociar);
routesActividadPorItem.get('/all', getAll);

module.exports = routesActividadPorItem;
