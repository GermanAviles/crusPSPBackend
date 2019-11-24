'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categoriaSchema = new Schema({
    _id: Number,
    nombre: String,
});

module.exports = mongoose.model('categoria', categoriaSchema, 'categorias' );