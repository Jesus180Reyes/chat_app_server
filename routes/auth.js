/*
   path: api/login


*/
const { Router } = require('express');
const { check } = require('express-validator');
const { crearUsuario, login, renewToken } = require('../controllers/auth');
const { validarJWT } = require('../middleware/validar_jwt');

const router = Router();

router.post('/new', crearUsuario);

router.post('/', [
   check('email', 'El email es obligatorio').isEmail(),
   check('password', 'El password es obligatorio').not().isEmpty(),
], login);

router.get('/renew', validarJWT, renewToken);


module.exports = router;
