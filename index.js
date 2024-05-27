const express = require("express")
const app = express()
const http = require("http")
const cors = require("cors")
const {Server} = require("socket.io")
const corsOptions = {
    origin: 'https://mensajero-ivf.onrender.com/', 
    optionsSuccessStatus: 200
  };
  
app.use(cors(corsOptions));

app.use(cors())


const server = http.createServer(app)

const io = new Server(server, {
    // cors: {
    //     origin: "https://mensajero-ivf.onrender.com/",
    //     methods: ["GET","POST"]
    // }
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