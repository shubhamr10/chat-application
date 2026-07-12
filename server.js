const http = require("node:http");
const express = require("express");
const { Server } = require("socket.io");
const path = require("node:path");
const chalk = require("chalk");
const app = express();
app.use(express.static(path.join(__dirname, "public")));

// CONSTANTS
const USER_CONNECTED = "USER_CONNECTED";
const USER_DISCONNECTED = "USER_DISCONNECTED";
const EMIT_MESSAGE = "chat_message";
const RECIEVE_MESSAGE = "chat_message";
const SET_USERNAME = "set_username";


const server = http.createServer(app);
const io = new Server(server);
const userMapping = {};

io.on("connection", (socket)=> {
    console.log(chalk.green(`A user connected with socket ID ==> ${socket.id}`));

    // When someone sets the nickname
    socket.on(SET_USERNAME, (userName)=> {
        userMapping[socket.id] = userName;
         socket.broadcast.emit(USER_CONNECTED, `${userMapping[socket.id]} connected to the chatroom !`);
    });

    // When someone sends a message
    socket.on(RECIEVE_MESSAGE, (message) => {
        const messageObject = {
            timestamp:Date.now() / 1000,
            messageText:message,
            userName:userMapping[socket.id]
        };
        socket.broadcast.emit(EMIT_MESSAGE, messageObject);
    })


    // When the user is disconnected!
    socket.on("disconnect", ()=>{
        console.log(chalk.red(`${userMapping[socket.id]} disconected with socket ID ==> ${socket.id}`));
        socket.broadcast.emit(USER_DISCONNECTED, `${userMapping[socket.id]} disconected from the chatroom !`);
    })
});

server.listen(3000, ()=> console.log("Server is running on port 3000"));


