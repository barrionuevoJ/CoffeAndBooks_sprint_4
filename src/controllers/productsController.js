const jsonDB = require('../model/jsonDatabase');
const productModel = jsonDB('products')
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controlador = {

    // Mostrar todos los productos
    all: (req, res) => {
        const listaProductos = productModel.all()
        res.render('productList', {lista: listaProductos})
    },

    // Mostrar un producto
    detail: (req, res) => {
        const product = productModel.find(req.params.id)
        res.render('productDetail', { libro: product, toThousand })
    },

    // Crear un producto
    create: (req, res) => {
        res.render('formCreate')
    },


    // Guardar un producto

    store: (req, res) => {
        // Atrapo todos los campos del formulario
        const newProduct = { ...req.body, image: 'default-image.png' }
        productModel.create(newProduct)
        console.log('cree un nuevo producto')
        res.redirect('/')
    },

    // Editar un producto
    edit: (req, res) => {
        console.log('ESTOY USANDO EL EDIT DEL GENERICO')
        let productToEdit = productModel.find(req.params.id)
        res.render('formEdit', { productToEdit })
    },

    // Actualizar un producto
    update: (req, res) => {
        let productToEdit = productModel.find(req.params.id)

        productToEdit = {
            id: productToEdit.id,
            ...req.body,
            img: productToEdit.img,
        }

        productModel.update(productToEdit)
        res.redirect("/");

    },

    // Eliminar un producto
    destroy: function (req, res) {
        productModel.delete(req.params.id);
        res.redirect("/");
    }

};



module.exports = controlador;