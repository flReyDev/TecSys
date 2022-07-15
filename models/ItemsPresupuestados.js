const { DataTypes } = require('sequelize');
const dbConection = require('../database/conection');


const ItemsPresupuestados = dbConection.define('itemspresupuestados', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    presupuestoId:{
        type: DataTypes.BIGINT
    },
    itemId: {
        type: DataTypes.BIGINT
    }
})

module.exports = ItemsPresupuestados;