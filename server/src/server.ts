import http from "node:http";
import express from "express";
import { Server } from "socket.io";
import chalk from "chalk";
import type { Socket } from "socket.io";
import type { User, Message } from "./types";

const USER_CONNECTED = "user_connected";
const USER_DISCONNECTED = "user_disconnected";
const SET_USERNAME = "set_username";
const CHAT_MESSAGE = "chat_message";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors : {
    origin:"http://localhost:5173", // your vite client
    methods:["GET", "POST"]
  }
});

// User record
const userMapping : Record<string, User> = {};

// Initialise socket connection
io.on("connection", (socket:Socket) => {
  console.log(chalk.green(`A user connected with socket ID ==> ${socket.id}`));

  // Only broadcast when user sets a name
  socket.on(SET_USERNAME, (username:string) => {
    userMapping[socket.id] = {
      id:socket.id,
      username:username
    };
    io.emit(USER_CONNECTED, Object.values(userMapping));
  });

  // When a user sends a message
  socket.on(CHAT_MESSAGE, (message:Message) => {
    // echo to everyone including sender
    io.emit(CHAT_MESSAGE, message);
  })

  // When a user is disconnected!
  socket.on("disconnect", () => {
    if(userMapping[socket.id]){
      delete userMapping[socket.id];
      io.emit(USER_DISCONNECTED, Object.values(userMapping));
    }
  })
});

server.listen(3000, ()=> console.log(chalk.blue("server is running on port 3000")));