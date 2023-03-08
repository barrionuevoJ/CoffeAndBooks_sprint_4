const express = require('express')
const router = express.Router();
const userController = require ('../controllers/userController')

router.get('/login', userController.login);

router.get('/register', userController.register);

router.get('/formCreate', userController.formCreate);

router.get('/formEdit', userController.formEdit);

module.exports = router;