'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');

const productoSchema = new Schema({
    _id: Number,
    disponible: Boolean,
    nombre: String,
    precio: Number,
    categoria: Number,
    fechaProducto: Object
});

autoIncrement.initialize( mongoose.connection );
productoSchema.plugin(autoIncrement.plugin, 'producto');

module.exports = mongoose.model('producto', productoSchema, 'productos');