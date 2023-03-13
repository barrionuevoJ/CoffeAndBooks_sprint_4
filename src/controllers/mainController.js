const jsonDB = require('../model/jsonDatabase');
const productModel = jsonDB('products');
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


const mainController = {
    index: (req, res) => {

        const masVendidos = productModel.masVendidos('masVendidos')
        const ofertas = productModel.ofertas('ofertas')
        const interes = productModel.interes('interes')
        res.render('index', { masVendidos, ofertas, interes, toThousand })
    },

    productCart: (req, res) => {
        
        const carrito = productModel.carrito()
        res.render('productCart', { carrito, toThousand })
    }
}




module.exports = mainController;