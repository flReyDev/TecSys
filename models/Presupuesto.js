const { DataTypes } = require('sequelize');
const dbConection = require('../database/conection');
const Items = require('./Items');
const ItemsPresupuestados = require('./ItemsPresupuestados');
const Usuario = require('./Usuario');


const Presupuesto = dbConection.define('presupuestos',{
    id:{
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    referencia: {
        type: DataTypes.TEXT,
        validate:{
            contains: 'TEC-PRE',
            len: [10, 100, { msg: "Error en al referencia, longitud minima 10 maximo 100 debe contener TEC-PRE" }]
        }
    },
    fechaelaboracion: {
        type: DataTypes.DATE,
        validate: {
            isDate: true
        }
    },
    idusuario:{
        type: DataTypes.BIGINT,
        validate:{
            isNumeric: true
        }
    },
    descripcion: {
        type: DataTypes.TEXT,
        validate: {
            len: [10, 100, { msg: "Longitud minima 10 maxima 100 caracteres" }]
        }
    },
    obs: {
        type: DataTypes.TEXT,
        validate: {
            len: [10, 200, { msg: "Longitud minima 10 maxima 200 caracteres" }]
        }
    }
})


Presupuesto.belongsTo(Usuario, { foreignKey: 'idusuario' })
Usuario.hasMany(Presupuesto, { foreignKey: 'idusuario' })



//Relación muchos a muchos Un presupuesto tiene muchos items y muchos items tienen muchos presupuestos
//Segun el diseño el modelo principal es Presupuesto -> Items
Presupuesto.belongsToMany(Items, { through: ItemsPresupuestados})
Items.belongsToMany(Presupuesto, { through: ItemsPresupuestados})

module.exports = Presupuesto;