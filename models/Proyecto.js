const { DataTypes } = require('sequelize');
const dbConection = require('../database/conection');
const Estados = require('./Estados');
const Presupuesto = require('./Presupuesto');
const TipoProyectos = require('./TipoProyectos');


const Proyectos = dbConection.define('proyectos', {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true
        },
        nombre: {
            type: DataTypes.TEXT,
            validate:{
                len: [5, 80, { msg: "Longitud minima de 5 y maxima de 80 caracteres." }]
            }
        },
        descripcion: {
            type: DataTypes.TEXT,
            validate: {
                len: [10, 255, { msg: "Longitud minima de 10 y maxima de 255 caracteres!" }]
            }
        },
        ubicacion: {
            type: DataTypes.TEXT,
            validate: {
                len: [10, 50, { msg: "Longitud minima de 10 y maxima de 255 caracteres!" }]
            }
        },
        idtipo:{
            type: DataTypes.BIGINT,
            validate: {
                isNumeric: true
            }
        },
        inicio_previsto: {
            type: DataTypes.DATE,
            validate:{
                isDate: true
            }
        },
        idestado:{
            type: DataTypes.BIGINT,
            validate:{
                isNumeric: true
            }
        },
        idpresupuesto:{
            type: DataTypes.BIGINT,
            validate: {
                isNumeric: true
            }
        }
    }
)

//Relación de uno a muchos
//belongsTo -> cuando la llave esta en el modelo de origen en este caso Proyectos
//hasMany -> relación de uno a muchos, cuando la llave esta en el modelo de destino en este caso Proyecto 
Proyectos.belongsTo(Estados, {foreignKey: 'idestado'});
Estados.hasMany(Proyectos, { foreignKey: 'idestado'});


//Relación uno a muchos
Proyectos.belongsTo(TipoProyectos,{ foreignKey: 'idtipo'})
TipoProyectos.hasMany(Proyectos, {foreignKey: 'idtipo'})

//relación uno a uno
Proyectos.Presupuesto = Proyectos.belongsTo(Presupuesto,{ foreignKey: 'idpresupuesto'});
Presupuesto.hasOne(Proyectos, { foreignKey: 'idpresupuesto' })

 module.exports = Proyectos