const { DataTypes } = require('sequelize');
const dbConection = require('../database/conection');


const ActividadPorItem = dbConection.define('actividadporitem',{
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    itemId: {
        type: DataTypes.BIGINT
    },
    actividadId: {
        type: DataTypes.BIGINT
    }
},{ tableName: 'actividadporitem'} )

module.exports = ActividadPorItem;