const { DataTypes } = require('sequelize');
const dbConection = require('../database/conection');


const TipoProyectos = dbConection.define('tipoproyectos', {
    id:{
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    descripcion: {
        type: DataTypes.TEXT
    }
})

module.exports = TipoProyectos;