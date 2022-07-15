const { DataTypes } = require("sequelize");
const dbConection = require("../database/conection");



const MaterialPorActividad = dbConection.define('materialporactividad',{
    id:{
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    actividadeId: {
        type: DataTypes.BIGINT
    },
    materialeId: { 
        type: DataTypes.BIGINT
    },
    cantidad: {
        type: DataTypes.INTEGER
    },
    valorsiniva:{
        type: DataTypes.FLOAT
    },
    iva: {
        type: DataTypes.FLOAT
    },
    valortotal: {
        type: DataTypes.DOUBLE
    }
}, {
    tableName: 'materialporactividad'
});

module.exports = MaterialPorActividad;