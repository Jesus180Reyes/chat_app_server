const { response } = require('express');
const { validationResult } = require('express-validator');
const usuario = require('../models/usuario');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generarJwt } = require('../helpers/jwt');
const crearUsuario = async (req, resp) => {

    // const errores = validationResult(req);

    // if (errores.isEmpty()) {
    //     return resp.status[400].json({
    //         ok: false,
    //         errors: errores.mapped()
    //     });
    // }

    const usuario = new Usuario(req.body);

    // Encriptar contrasena
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(usuario.password, salt);

    await usuario.save();
    // Converitr mi JWT
    const token = await generarJwt(usuario.id);

    resp.json({
        ok: true,
        msg: usuario,
        token
    });
}

const login = async (req, res = response) => {
    const { email, password } = req.body;


    try {
        const usuarioDb = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(404).json({
                ok: false,
                msg: "Email no encontrado"
            });
        }

        // Validar password
        const validPassword = bcrypt.compareSync(password, usuarioDb.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: "Password incorrecto"
            });
        }
        // Generar JWT
        const token = await generarJwt(usuarioDb.id);
        res.json({
            ok: true,
            usuario: usuarioDb,
            token
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Error, Hable con el administrador',


        });

    }

}
const renewToken = async (req, res = response) => {

    const uid = req.uid;
    const token = await generarJwt(uid);
    const usuario = await Usuario.findById(uid);

    res.json({
        ok: true,
        usuario,
        token



    });
}

module.exports = {
    crearUsuario,
    login,
    renewToken
}