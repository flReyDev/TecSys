
const { DataTypes } = require('sequelize');
const dbConection = require('../database/conection');
const TipoMaterial = require('./TipoMaterial');

const Materiales = dbConection.define('materiales', {
    id:{
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    descripcion:{
        type: DataTypes.TEXT,
        validate:{
            len: [10, 50, { msg:"Longitud minina de 10 y maxima de 50 caracteres" }]
        }
    },
    codigo: {
        type: DataTypes.TEXT,
        validate: {
            isNumeric: true,
            len: [4, 100, { msg: "Longitud minina es de 4 y maxima de 100 caracteres" }]
        }
    },
    tipomaterialId: {
        type: DataTypes.BIGINT,
        validate: {
            isNumeric:true
        }
    },
    um:{
        type: DataTypes.TEXT,
        validate: {
            len: [2, 4, { msg: 'Longitud minima 2 maxima 4' }]
        }
    }
},{
    tableName: 'materiales'
});



Materiales.belongsTo(TipoMaterial, {foreignKey: 'tipomaterialId' });
TipoMaterial.hasMany(Materiales, {foreignKey: 'tipomaterialId'})

module.exports = Materiales;