const { DataTypes } = require('sequelize');
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
        type: DataTypes.TEXT,
        validate: {
            len:[10, 100, 
              {
                msg: "Longitud minina aceptada para el campo es de 10 caracteres intente nuevamente!"
              }
            ]
        }
    }
},{tableName: 'actividades'})


Actividades.belongsToMany(Materiales, { through: MaterialPorActividad, foreignKey:"materialeId"})
Materiales.belongsToMany(Actividades, { through: MaterialPorActividad, foreignKey:"actividadeId"})

module.exports = Actividades;