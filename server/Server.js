
const express        = require("express");
// const { routerUsers } = require("../routes/UserRoutes");
const { routerProjects } = require("../routes/proyecto.routes");
const { routerPresupuesto } = require("../routes/presupuesto.routes");

const cors = require('cors')

const database = require('../database/conection');
const routerMateriales = require("../routes/materiales.routes");
const routerActividad = require("../routes/actividades.routes");
const { routerUsers } = require("../routes/usuarios.routes");
const routerArea = require("../routes/area.routes");
const routerCargo = require("../routes/cargos.routes");


class Server{

    app     = express.application;
    port    = Number;
    apiRoutes = {
        usuarios:  '/users',
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

        // this.dbConecction();
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
        this.app.use(cors());
        //parsear el contenido del body a Json()
        this.app.use(express.json());
        //url-encoder
        this.app.use(express.urlencoded({ extended: true }))
        //static files
        //this.app.use(express.static('public'));
    }

    /**
     * Registro de rutas de la api
     */
    routes(){
        this.app.use( this.apiRoutes.usuarios,      routerUsers )
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
