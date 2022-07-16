const { DataTypes } = require("sequelize");
const dbConection = require("../database/conection");


const Area = dbConection.define('area', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.TEXT,
        validate:{
            len:[5, 10, { msg: 'Longitud minima de 5 caracteres maxima de 50'}]
        }
    },
    ubicacion: {
        type: DataTypes.STRING,
        validate:{
            len:[5, 10, { msg: 'Longitud minima de 5 caracteres maxima de 10'}]
        }
    },
    telefono: {
        type: DataTypes.STRING,
        validate:{
            len: [7, 10, {msg: 'Longitud minima de un telefono es de 7 o 10 numeros'}]
        }
    },
    oficina:{
        type: DataTypes.STRING,
        validate:{
            len: [4, 10, {msg:'Longitud minima de 4 caracteres maxima de 10'}]
        }
    }
},{ tableName: 'area'})

module.exports = Area;