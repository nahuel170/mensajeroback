const mongoose= require ('mongoose');
const dotenv = require ('dotenv');
dotenv.config();

const urlAtlas = process.env.urlAtlas;

const conexion= mongoose.connect(urlAtlas, { useNewUrlParser: true, useUnifiedTopology: true }) 
    .then(() => console.log('Conectado a MongoDB'))
    .catch(err => console.error('No se pudo conectar a MongoDB', err));
module.exports= conexion;




