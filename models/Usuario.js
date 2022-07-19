const { DataTypes } = require('sequelize');
const dbConection = require('../database/conection');
const Area = require('./Area');
const Cargo = require('./Cargo');
const Role = require('./Roles');

const Usuario = dbConection.define('usuarios', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.TEXT,
        validate: {
            len: [5, 50, { msg: "Longitud minima de 5 y maxima de 50 caracteres!" }]
        }
    },
    apellido: {
        type: DataTypes.STRING,
        validate: {
            len: [5, 50, { msg: "Longitud minima de 5 y maxima de 50 caracteres!" }]
        }
    },
    email:{
        type: DataTypes.STRING,
        validate:{
            isEmail: true
        }
    },
    cargoId:{
        type:DataTypes.BIGINT,
        validate:{
            isNumeric: true
        }
    },
    edad:{
        type: DataTypes.STRING,
        validate:{
            isNumeric: true
        }
    },
    areaId:{
        type: DataTypes.BIGINT,
        validate:{
            isNumeric: true
        }
    },
    direccion: {
        type: DataTypes.STRING,
        len: [10, 50, { msg: "Longitud minima de 5 y maxima de 50 caracteres!" }]

    },
    telefono:{
        type: DataTypes.STRING,
        validate:{
            isNumeric: true
        }
    },
    roleId:{
        type: DataTypes.INTEGER,
        validate: {
            isNumeric: true
        }
    },
    intentos:{
        type: DataTypes.INTEGER
    },
    estado_acceso:{
        type: DataTypes.INTEGER,
        defaultValue: 1
    },
    tiempo_bloqueo:{
        type: DataTypes.TIME
    },
    ultimasession:{
        type: DataTypes.DATE,
        defaultValue: (new Date()).toISOString()
    },
    contrasena:{
        type: DataTypes.TEXT
    }
},{ tableName: 'usuarios'})


Usuario.belongsTo(Area, { foreignKey: 'areaId' });
Area.hasMany(Usuario, {foreignKey: 'areaId'});

Usuario.belongsTo(Cargo, {foreignKey: 'cargoId'});
Cargo.hasMany(Usuario, {foreignKey: 'cargoId'});

Usuario.belongsTo(Role, { foreignKey: 'roleId' });
Role.hasMany(Usuario, { foreignKey: 'roleId' });


/******************
 * 
 * Hacer la relación de presupuesto con usuario
 * Registrar las rutas de usuarios y generar el controlador
 */




module.exports = Usuario;