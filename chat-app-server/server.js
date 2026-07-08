const http = require("http");
const { Server } = require("socket.io");
const express = require("express");
const app = express();

const server = http.createServer(app);
const io = new Server(server);
const path = require("path");

const userMapping = {};

app.use(express.static(path.join(__dirname, 'public')));

io.on("connection", (socket) =>{
    console.log("A user is connected " + socket.id);

    socket.on("set nickname", (nickname)=> {
        console.log(`Updating user ${socket.id} with a nickname ${nickname}`);
        userMapping[socket.id] = nickname;
    });

    socket.on("chat message", (msg) => {
        const nickname = userMapping[socket.id];
        socket.broadcast.emit("chat message", {
            [nickname]: msg
        });
    });

    


    // // Broadcast a message to connected users when someone connects or disconnects.
    // io.emit("chat message", `A user ${socket.id} connected to the chat room!`);
    // socket.on("chat message", (msg)=> {
    //     console.log("Message by " + socket.id + " = " + msg + "\n");
        
    //     // Emit the message to everyone including sender,
    //     io.emit("chat message", msg);
    // });

    // socket.on("username", (userName) => {
    //     socket.userName = userName;
    // });



    // when user disconnects inform the server about it's id
    // socket.on("disconnect", () => {
    //     console.log("A user with id=" + socket.id + " disconnected! \n");
    //     // Broadcast a message to connected users when someone connects or disconnects.
    //     io.emit("chat message", `A user ${socket.id} disconnected from the chat room!`);
    // })
});

server.listen(3000, ()=> console.log("Server is running on port 3000"));


/*
Broadcast a message to connected users when someone connects or disconnects.
Add support for nicknames.
Don’t send the same message to the user that sent it. Instead, append the message directly as soon as they press enter.
Add “{user} is typing” functionality.
Show who’s online.
Add private messaging.
Share your improvements!
*/

// Step - 1 Capture the nickname on the client
// Step - 2 Tell the server about it
// Step - 3 Server remember it.
// Step - 4 Attach the nickname when broadcasting
// Step - 5 Update the client to render it
// Step - 6 Don't skip this; clean up on disconnect
