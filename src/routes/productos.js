'use strict'
const { Router } = require('express');
const router = Router();
const productoModel = require('../models/producto');
const categoriasModel = require('../models/categorias');

// const app = express();

router.get('/', async (req, res) => {
    const products = await productoModel.find();
    //  res.send(algo);
    res.json(products);
});

router.post('/save', (req, res) => {

    const { disponible, nombre, precio, categoria, fechaProducto } = req.body;

    if ( disponible != null && nombre != null && precio != null && categoria != null && fechaProducto != null ) {
      // const producto = { ...req.body };
      const producto = new productoModel( req.body );

        producto.save().then(async () => {
            const products = await productoModel.find();
            res.status(201).json(products);
        }).catch(err => console.log(err));
    } else {
      res.send("algo salio mal hijo");
    }

});

router.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  const { disponible, nombre, precio, categoria, fechaProducto } = req.body;

  if ( disponible != null && nombre != null && precio != null && categoria != null && fechaProducto != null ) {

    await productoModel.update({ _id: id }, req.body);
    // recuperamos los productos actualizados
    const products = await productoModel.find();
    res.json(products);

  } else {
    res.send("algo salio mal hijo");
  }
});

router.delete("/delete/:id", async (req, res) => {
    const { id } = req.params;
    console.log(id);
    await productoModel.remove({ _id: id });
    const products = await productoModel.find();
    
    res.json(products);
});

router.get('/lists', async (req, res) => {
    console.log('entrando');
    const categorias = await categoriasModel.find();
    //  res.send(algo);
    res.json(categorias);
});

module.exports = router;