
const express = require("express");
const cors = require('cors')
var cookieParser = require('cookie-parser')


const { routerProjects } = require("../routes/proyecto.routes");
const { routerPresupuesto } = require("../routes/presupuesto.routes");
const database = require('../database/conection');
const routerMateriales = require("../routes/materiales.routes");
const routerActividad = require("../routes/actividades.routes");
const { routerUsers } = require("../routes/usuarios.routes");
const routerArea = require("../routes/area.routes");
const routerCargo = require("../routes/cargos.routes");
const authRoutes = require("../routes/auth.routes");
const whiteList = require("../helpers/whiteListCors");


class Server{

    app     = express.application;
    port    = Number;
    apiRoutes = {
        usuarios:  '/users',
        auth: '/auth',
        proyectos: '/projects',
        presupuestos: '/presupuestos',
        materiales: '/material',
        actividades: '/actividad',
        area: '/area',
        cargo: '/cargo'
    };

    constructor(){
        this.app    = express();
        this.port   = process.env.PORT || 3000;

        this.middlewares();
        this.routes();
    }

    async dbConecction(){
        try {
            await database.authenticate();
            console.log( 'Conexión establecida' );
        } catch (error) {
            throw new Error( error );
        }
    }

    middlewares(){


        
        //cors
        // this.app.use(cors({
        //     origin: function(origin, callback){
        //         if(whiteList.includes(origin)){
        //             return callback(null, origin);
        //         }
        //         return callback( `Seguridad de Cors, No estas autorizado para acceder desde ${ origin }` )
        //     }
        // }));

        this.app.use( cors() )

        //parsear el contenido del body a Json()
        this.app.use(express.json());
        //url-encoder
        this.app.use(express.urlencoded({ extended: true }))

        this.app.use( cookieParser() );
        //static files
        //this.app.use(express.static('public'));
    }

    /**
     * Registro de rutas de la api
     */
    routes(){
        this.app.use( this.apiRoutes.usuarios,      routerUsers )
        this.app.use( this.apiRoutes.auth,          authRoutes )
        this.app.use( this.apiRoutes.proyectos,     routerProjects )
        this.app.use( this.apiRoutes.presupuestos,  routerPresupuesto )
        this.app.use( this.apiRoutes.materiales,    routerMateriales)
        this.app.use( this.apiRoutes.actividades,   routerActividad )
        this.app.use( this.apiRoutes.area,          routerArea )
        this.app.use( this.apiRoutes.cargo,         routerCargo)


        this.app.get('*', (req, res)=>{
            res.status(404).json({
                error : 'La ruta solicitada no existe, valida e intenta nuevamente!!'
            })
        })
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log( `Servidor corriendo en el puerto: ${ this.port }` );
        })
    }
}

module.exports = {
    Server
};
