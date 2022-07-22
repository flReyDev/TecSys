const { DataTypes } = require("sequelize");
const dbConection = require("../database/conection");
const Actividades = require("./Actividades");
const ActividadPorItem = require("./ActividadPorItem");

const Items = dbConection.define('items', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.TEXT
    },
    descripcion: {
        type: DataTypes.TEXT
    }
},{ tableName: 'items'})

// Relacion de muchos a muchos -> Muchas Actividades tienen muchos Items y muchos Items tienen muchas actividades
//El modelo principal segun diseño es Items -> Acividades
Items.belongsToMany(Actividades, { through: ActividadPorItem, foreignKey:   'itemId'})
Actividades.belongsToMany(Items, { through: ActividadPorItem, foreignKey:   'actividadId'})

module.exports = Items;