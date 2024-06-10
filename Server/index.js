const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");


const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Tersting Server
app.get('/', (req, res) => { 
  res.send("Chat App Server ...")
  });

//On socket Connection
io.on('connection', (socket)=>{
    console.log('a user connected');
    //On Socket Message Event
    socket.on('message',(msg)=>{
        console.log('message : ' + msg);
        io.emit('message', msg);
    })

    //On Socket Disconnection
    socket.on('disconnect',()=>{
    console.log('user disconnected')
    })
})

//Listen Servert Port at 3000
//we also can use global ENV file to change the port 
server.listen(3000, () => {
  console.log('listening on http://localhost:3000/');
});