const http = require("http");
const { Server } = require("socket.io");
const express = require("express");
const app = express();

const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));

io.on("connection", (socket) =>{
    console.log("A user is connected " + socket.id);
    socket.on("chat message", (msg)=> {
        console.log("Message by " + socket.id + " = " + msg + "\n");
        
        // Emit the message to everyone including sender,
        io.emit("chat message", msg);
    })



    // when user disconnects inform the server about it's id
    socket.on("disconnect", () => {
        console.log("A user with id=" + socket.id + " disconnected! \n");
    })
});

app.get("/",(req, res) => res.send("Server is live."));
server.listen(3000, ()=> console.log("Server is running on port 3000"));
