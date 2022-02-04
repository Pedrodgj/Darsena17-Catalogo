const express = require('express');
const cors = require('cors')

const dbConnection = require('../db/config');

class Server {
    constructor() {
        //iniciando el servidor
        this.app = express();
        this.port = process.env.PORT;
        
        //llamar la base de datos
        this.conectarBd()

        //las rutas
        this.productosPath = '/api/productos';

        //middlewares
        this.middlewares()

        //inicio de las rutas
        this.routes()

    }

    async conectarBd() {
        await dbConnection();
    }

    middlewares() {

        //cors
        this.app.use(cors())

        //lectura y parseo del body
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended:true}));


        //directorio publico
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.productosPath, require('../routes/productos'))
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor escuchando desde el puerto', this.port);
        })
    }
}

module.exports = Server