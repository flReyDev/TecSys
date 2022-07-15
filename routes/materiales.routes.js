const { Router } = require("express");
const { body } = require("express-validator");
const { geAlltMateriales, getMaterial, postMaterial, updatetMaterial, deleteMaterial } = require("../controllers/materiales.controller");
const { validatorMiddlewares } = require("../middlewares/validator.middleware");


const routerMateriales = Router();

routerMateriales.get('/all',            geAlltMateriales);
routerMateriales.get('/:id',            getMaterial);
routerMateriales.post('/create',[
    body('descripcion', 'Error en la descripción del material')
        .isString()
        .isLength({ min: 8 }),
    body('codigo', 'Error en el codigo del producto verfique e intente de nuevo!!')
        .isString()
        .isLength({ min: 5 }),
    body('tipomaterialId', 'Error con el tipo de material!!')
        .isNumeric(),
    body('um', 'Error en la unidad de medida!!!')
        .isString()
        .isLength({ min: 2 })
],
validatorMiddlewares,
postMaterial);
routerMateriales.put('/update',         updatetMaterial);
routerMateriales.delete('/delete/:id',  deleteMaterial);


module.exports = routerMateriales;
