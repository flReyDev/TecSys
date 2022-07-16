const { Router } = require("express");
const { body } = require("express-validator");
const { geAlltMateriales, getMaterial, postMaterial, updatetMaterial, deleteMaterial } = require("../controllers/materiales.controller");
const { validatorMiddlewares } = require("../middlewares/validator.middleware");


const routerMateriales = Router();

routerMateriales.get('/all',            geAlltMateriales);
routerMateriales.get('/:id',[
    body('id', 'Error en el identificador del registro!')
        .custom((value, {req})=> Number.isInteger( req.params.id * 1 ) ?? value )
],
validatorMiddlewares,
getMaterial);

routerMateriales.post('/create',[
    body('descripcion', 'Error en la descripción del material')
        .isString()
        .isLength({ min: 8, max: 50 }),
    body('codigo', 'Error en el codigo del producto verfique e intente de nuevo, recuerda que debene ser solo numeros!!')
        .isNumeric()
        .isLength({ min: 4, max: 100 }),
    body('tipomaterialId', 'Error con el tipo de material, deben ser solo numeros!!')
        .isNumeric(),
    body('um', 'Error en la unidad de medida!!!')
        .isString()
        .isLength({ min: 2, max: 4 })
],
validatorMiddlewares,
postMaterial);

routerMateriales.put('/update',[
    body('id', "Valor del identificador no valido!!")
        .isNumeric(),
    body('descripcion', 'Error en la descripción del material')
        .isString()
        .isLength({ min: 8, max: 50 }),
    body('codigo', 'Error en el codigo del producto verfique e intente de nuevo, recuerda que debene ser solo numeros!!')
        .isNumeric()
        .isLength({ min: 4, max: 100 }),
    body('tipomaterialId', 'Error con el tipo de material, deben ser solo numeros!!')
        .isNumeric(),
    body('um', 'Error en la unidad de medida!!!')
        .isString()
        .isLength({ min: 2, max: 4 })
],
validatorMiddlewares, updatetMaterial);

routerMateriales.delete('/delete/:id',[
    body('id', 'Error en el identificador del registro!')
        .custom( (value, { req })=> Number.isInteger( req.params.id * 1 ) ?? value )
],validatorMiddlewares, deleteMaterial);


module.exports = routerMateriales;
