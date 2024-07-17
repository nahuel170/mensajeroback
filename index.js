const express = require("express")
const app = express()
const http = require("http")
const cors = require("cors")
const {Server} = require("socket.io")
const conexion = require('./dataBase/conexion');
const Message = require('./models/chatModels');
const corsOptions = {
    origin: 'http://https://mensajero-ivf.onrender.com:5173', 
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']}
app.use(cors())


const server = http.createServer(app)

const io = new Server(server, {
     cors: {
        origin: 'https://mensajero-ivf.onrender.com://localhost:5173', 
        methods: ['GET', 'POST'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true
     }
})

io.on("connection", (socket) => {
    console.log(`Usuario actual: ${socket.id}`);

    socket.on("join_room", (data) => {
        socket.join(data)
        console.log(`Usuario con id: ${socket.id} se unió a las sala: ${data}`);

        Message.find({room: data}).sort({timestamp: 1}). then((messages)=>{
            socket.emit('mensajes_previos',messages);
        });
    });
    
    socket.on("send_message", (data) => {
        const Message = new message(data);
        Message.save().then(() => {
            socket.to(data.room).emit("receive_message", data);
        }).catch(err => console.error('Error guardando mensaje en la BD', err));
    });
    

    socket.on("disconnect", () => {
        console.log("Usuario desconectado",socket.id)
    });
});

server.listen(3001, () => {
    console.log("SERVER RUNNING")
})