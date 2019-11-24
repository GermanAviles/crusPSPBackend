'use strict'
// nos permite concatenar las rutas de los archivos sin importar el SO
// const path = require('path');
// nuestro gestor de base de datos
const mongoose = require('mongoose');
// nos permite visualizar lo que le llega al servidor
const morgan = require('morgan');
const express = require('express');
// nuestro servidor
const app = express();

// conect database
const urlDataBase = 'mongodb://localhost:27017/productosPSP';
const config = { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true };
mongoose.connect(urlDataBase, config).then( (db) => console.log('DB conectada') ).catch( (err) => console.log('ERROR: ', err) );

// settings
app.set('port', process.env.PORT || 3001);
app.set('json spaces', 2);
// app.set('name', path.join( __dirname, 'folder' ) );

// middlewares
app.use( morgan('dev') );
app.use( express.urlencoded({extended: false}) );
app.use( express.json() );
app.use( (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();

});

// routes
app.use(require('./routes/index'));
app.use('/api/productos', require('./routes/productos'));

// starting the server
app.listen(app.get('port'), () => {
    console.log(`Corriendo en: http://localhost:${ app.get('port') }`);
});
