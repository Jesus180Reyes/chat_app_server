const mongoose = require('mongoose');
const dbConection = async () => {
    try {
        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true

        });
        console.log("DB-CONNECTED");


    } catch (error) {
        console.log(error);
        throw new Error('error en la conexion - hable con el administrador');

    }
}
module.exports = {
    dbConection
}