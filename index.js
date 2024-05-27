const express = require("express")
const app = express()
const http = require("http")
const cors = require("cors")
const {Server} = require("socket.io")

app.use(cors())
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Esto permite todas las solicitudes, puedes reemplazar '*' con el dominio específico de tu frontend
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: "https://mensajero-ivf.onrender.com/",
        methods: ["GET","POST"]
    }
})

io.on("connection", (socket) => {
    console.log(`Usuario actual: ${socket.id}`);

    socket.on("join_room", (data) => {
        socket.join(data)
        console.log(`Usuario con id: ${socket.id} se unió a las sala: ${data}`);
    })
    socket.on("send_message", (data) => {
       socket.to(data.room).emit("receive_message",data);
    })

    socket.on("disconnect", () => {
        console.log("Usuario desconectado",socket.id)
    })
})

server.listen(3001, () => {
    console.log("SERVER RUNNING")
})