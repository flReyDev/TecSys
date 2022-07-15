const { DataTypes } = require("sequelize");
const dbConection = require("../database/conection");


const Area = dbConection.define('area', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.TEXT
    },
    ubicacion: {
        type: DataTypes.STRING
    },
    telefono: {
        type: DataTypes.STRING
    },
    oficina:{
        type: DataTypes.STRING
    }
},{ tableName: 'area'})

module.exports = Area;