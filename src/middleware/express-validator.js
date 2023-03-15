const { body } = require('express-validator');
const path = require('path')

const validaciones = {
    validarProducto: [
        body('titulo').isLength({ min: 1 }).withMessage('El titulo es obligatorio.').bail(),
        body('autor').isLength({ min: 1 }).withMessage('El autor es obligatorio.').bail(),
        body('descripcion').isLength({ min: 1 }).withMessage('La descripcion es obligatoria.').bail(),
        body('categoria').isLength({ min: 1 }).withMessage('La categoria es obligatoria.').bail(),
        body('descuento').isNumeric().default('0').withMessage('El descuento debe ser un numero.').bail(),
        body('cantidad').isNumeric().default('1').withMessage('La cantidad debe ser un numero.').bail(),
        body('precio').isNumeric().default('0').withMessage('El precio debe ser un numero.').bail(),
        body('genero').isLength({ min: 1 }).withMessage('El genero es obligatorio.').bail(),
        body('img').custom((value, { req }) => {
            let file = req.file;
            let acceptedExtensions = ['.jpg', '.png', '.jpeg'];
            if (file) {
                let fileExtension = path.extname(file.originalname)
                if (!acceptedExtensions.includes(fileExtension)) {
                    throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`)
                }
            }
            return true;
        })
    ]
}

module.exports = validaciones;