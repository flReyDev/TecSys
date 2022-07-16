const { DataTypes } = require("sequelize");
const dbConection = require("../database/conection");


const Cargo = dbConection.define('cargos', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.TEXT,
        validate:{
            len: [5, 40, { msg: "Longitud minima 5 a 40 caracteres!" }]
        }
    },
    funciones: {
        type: DataTypes.TEXT,
        validate:{
            len: [5, 100, { msg:"Longitud minima 5 maxima 100 caracteres!!" }]
        }
    },
},{ tableName: 'cargos'})


module.exports = Cargo;

