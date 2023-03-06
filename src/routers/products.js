// /products (GET)Listado de productos

// /products/create (GET)Formulario de creación de productos

// /products/:id (GET)Detalle de un producto particular

// /products (POST)Acción de creación (a donde se envía el formulario)

// /products/:id/edit (GET)Formulario de edición de productos

// /products/:id (PUT)Acción de edición (a donde se envía el formulario):

// /products/:id (DELETE)Acción de borrado

const express = require('express');
const router = express.Router();

const productsController = require('../controllers/productsController')

// /products

// Obtener todos los productos 
router.get('/', productsController.all);

// Crear un producto 
router.post('/', productsController.store);
router.get('/create', productsController.create);


// Obtener un producto
router.get('/detail/:id', productsController.detail);

// Editar un producto
router.get('/edit/:id', productsController.edit);
router.put('/edit/:id', productsController.update); 

// Borrar un producto 
router.delete('/delete/:id', productsController.destroy); 


module.exports = router;