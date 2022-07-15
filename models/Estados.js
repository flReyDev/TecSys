const { DataTypes } = require('sequelize');
const dbConection = require('../database/conection');


const Estados = dbConection.define('estados', {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    descripcion: {
        type: DataTypes.TEXT
    }
})

module.exports = Estados;