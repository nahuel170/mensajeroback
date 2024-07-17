const mongoose= require ('mongoose');
const dotenv = require ('dotenv');
dotenv.config();

const urlAtlas ='mongodb+srv://nahuelraspo20:Tumami12@cluster0.0nqfrd0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const conexion= mongoose.connect(urlAtlas, { useNewUrlParser: true, useUnifiedTopology: true }) 
    .then(() => console.log('Conectado a MongoDB'))
    .catch(err => console.error('No se pudo conectar a MongoDB', err));
module.exports= conexion;




