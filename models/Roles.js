const { DataTypes } = require("sequelize");
const dbConection = require("../database/conection");


const Role = dbConection.define('roles', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.TEXT,
        validate:{
            len: [5, 50, { msg: "Longitud minima 5 a 50 caracteres!" }]
        }
    },
    detalle_permisos: {
        type: DataTypes.TEXT,
        validate:{
            len: [5, 100, { msg:"Longitud minima 5 maxima 100 caracteres!!" }]
        }
    },
},{ tableName: 'roles'})


module.exports = Role;