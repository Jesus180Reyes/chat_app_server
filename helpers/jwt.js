const res = require('express/lib/response');
const jwt = require('jsonwebtoken');


const generarJwt = (uid) => {


    return new Promise((resolve, reject) => {
        const payload = { uid, };
        jwt.sign(payload, process.env.JWT_KEY, {
            expiresIn: '24h',

        }, (err, token) => {
            if (err) {
                // no se pudo crear el token
                reject('no se pudo generar el JWT token');
            }
            else {
                // se creo el token
                resolve(token);
            }
        });
    });

}

module.exports = {
    generarJwt
}