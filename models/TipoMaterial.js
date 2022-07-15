const { DataTypes } = require("sequelize");
const dbConection = require("../database/conection");


const TipoMaterial = dbConection.define('tipomaterial',{
    id:{
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    descripcion: {
        type: DataTypes.STRING
    }
},{tableName:'tipomaterial'})


module.exports = TipoMaterial;