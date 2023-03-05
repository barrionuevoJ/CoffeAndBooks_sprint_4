const listaLibros = productosMasVendidos.concat(ofertas, interes);

const controlador = {
    index: (req, res) => {
        res.render('index', { productos: productosMasVendidos, ofertas: ofertas, interes: interes});
    },

    productCart: (req, res) => {
        res.render('productCart', { carrito: interes});
    },

    productDetail: (req, res) => {
        let libro = listaLibros.find(libro => libro.id == req.params.libroId);
        res.render("productDetail", { libro: libro });
    },

    productList: (req,res) => {
        res.render('productList', {lista: listaLibros})
    },
}

module.exports = controlador;