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
            type: DataTypes.TEXT
        },
        descripcion: {
            type: DataTypes.TEXT
        },
        ubicacion: {
            type: DataTypes.TEXT
        },
        idtipo:{
            type: DataTypes.BIGINT
        },
        inicio_previsto: {
            type: DataTypes.DATE
        },
        idestado:{
            type: DataTypes.BIGINT
        },
        idpresupuesto:{
            type: DataTypes.BIGINT
        },
        createdAt:{
            type: DataTypes.DATE
        },
        updatedAt:{
            type: DataTypes.DATE
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