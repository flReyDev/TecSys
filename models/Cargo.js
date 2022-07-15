const { DataTypes } = require("sequelize");
const dbConection = require("../database/conection");


const Cargo = dbConection.define('cargos', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.TEXT
    },
    funciones: {
        type: DataTypes.TEXT
    },
},{ tableName: 'cargos'})


module.exports = Cargo;

