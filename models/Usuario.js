const { DataTypes } = require('sequelize');
const dbConection = require('../database/conection');
const Area = require('./Area');
const Cargo = require('./Cargo');

const Usuario = dbConection.define('usuarios', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.TEXT
    },
    apellido: {
        type: DataTypes.STRING
    },
    cargoId:{
        type:DataTypes.BIGINT
    },
    edad:{
        type: DataTypes.STRING
    },
    areaId:{
        type: DataTypes.BIGINT
    },
    direccion: {
        type: DataTypes.STRING
    },
    telefono:{
        type: DataTypes.STRING
    },
    ultimasession:{
        type: DataTypes.DATE,
        defaultValue: (new Date()).toISOString()
    },
    contrasena:{
        type: DataTypes.TEXT
    }
},{ tableName: 'usuarios'})


Usuario.belongsTo(Area, { foreignKey: 'areaId' });
Area.hasMany(Usuario, {foreignKey: 'areaId'});

Usuario.belongsTo(Cargo, {foreignKey: 'cargoId'});
Cargo.hasMany(Usuario, {foreignKey: 'cargoId'});


/******************
 * 
 * Hacer la relación de presupuesto con usuario
 * Registrar las rutas de usuarios y generar el controlador
 */




module.exports = Usuario;