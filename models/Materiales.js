
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
        type: DataTypes.TEXT
    },
    codigo: {
        type: DataTypes.TEXT
    },
    tipomaterialId: {
        type: DataTypes.BIGINT
    },
    um:{
        type: DataTypes.TEXT
    }
},{
    tableName: 'materiales'
});



Materiales.belongsTo(TipoMaterial, {foreignKey: 'tipomaterialId' });
TipoMaterial.hasMany(Materiales, {foreignKey: 'tipomaterialId'})

module.exports = Materiales;