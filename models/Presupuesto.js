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
        type: DataTypes.TEXT
    },
    fechaelaboracion: {
        type: DataTypes.DATE
    },
    idusuario:{
        type: DataTypes.BIGINT
    },
    descripcion: {
        type: DataTypes.TEXT
    },
    obs: {
        type: DataTypes.TEXT
    }
})


Presupuesto.belongsTo(Usuario, { foreignKey: 'idusuario' })
Usuario.hasMany(Presupuesto, { foreignKey: 'idusuario' })



//Relación muchos a muchos Un presupuesto tiene muchos items y muchos items tienen muchos presupuestos
//Segun el diseño el modelo principal es Presupuesto -> Items
Presupuesto.belongsToMany(Items, { through: ItemsPresupuestados})
Items.belongsToMany(Presupuesto, { through: ItemsPresupuestados})

module.exports = Presupuesto;