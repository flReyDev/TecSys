const { DataTypes, Model } = require('sequelize');
const dbConection = require('../database/conection');
const Materiales = require('./Materiales');
const MaterialPorActividad = require('./MaterialPorActividad');


const Actividades =  dbConection.define('actividades',{
    
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    descripcion: {
        type: DataTypes.TEXT
    }
},{tableName: 'actividades'})


Actividades.belongsToMany(Materiales, { through: MaterialPorActividad, foreignKey:"materialeId"})
Materiales.belongsToMany(Actividades, { through: MaterialPorActividad, foreignKey:"actividadeId"})

module.exports = Actividades;