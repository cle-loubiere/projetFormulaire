const express = require ('express')
const router = express.Router();

//Import du controller
const UserController = require('../controllers/user')

/*
* Route de login, renvoie un JWT token a l'utilisateur
*/
router.post('/login', UserController.login)

/*
* Route pour creer un utilisateur
*/
router.post('/signup', UserController.signup)




module.exports = router