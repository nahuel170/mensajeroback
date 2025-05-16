const express = require("express")
const app = express()
const http = require("http")
const cors = require("cors")
const {Server} = require("socket.io")
const Message = require('./models/chatModels');
const corsOptions = {
    origin: '*', 
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']}
app.use(cors())


const server = http.createServer(app)

const io = new Server(server, {
     cors: {
        origin: '*', 
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
    
    socket.on("send_message",async (data) => {
        const newMessage = new Message({
            room: data.room,
            content: data.content,
            sender: data.sender,
        });
        try{
            await newMessage.save();
      socket.to(data.room).emit('receive_message', data);
        }catch (err) {
            console.error(err);
          }
       
        
    });
    

    socket.on("disconnect", () => {
        console.log("Usuario desconectado",socket.id)
    });
});

server.listen(3001, () => {
    console.log("SERVER RUNNING")
})