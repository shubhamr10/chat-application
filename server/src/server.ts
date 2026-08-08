import http from "node:http";
import express from "express";
import { Server } from "socket.io";
import chalk from "chalk";
import type { Socket } from "socket.io";
import type { User, Message, SocketUsers } from "./types";
import authRouter from "./routes/auth";
import {pool} from "./db";
import { authSocket } from "./middleware/authSocket";
import type { TokenPayload } from "./middleware/authSocket";
import cors from "cors";

const USER_CONNECTED = "user_connected";
const USER_DISCONNECTED = "user_disconnected";
const SET_USERNAME = "set_username";
const CHAT_MESSAGE = "chat_message";

const app = express();
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST'],
  credentials: true
}));
app.use(express.json());
app.use("/auth", authRouter);
const server = http.createServer(app);
const io = new Server(server, {
  cors : {
    origin:"http://localhost:5173", // your vite client
    methods:["GET", "POST"]
  }
});

// User record
const userMapping : Record<string, SocketUsers> = {};

// Integrate the authSocket middleware
io.use(authSocket);

// Initialise socket connection
io.on("connection", (socket:Socket) => {
  console.log(chalk.green(`A user connected with socket ID ==> ${socket.id}`));

  // Only broadcast when user sets a name
  socket.on(SET_USERNAME, (username:string) => {
    const user = socket.data.user as TokenPayload;
    userMapping[socket.id] = {
      socket_id:socket.id,
      username:user.username,
      id:socket.data.user.id,

    };
    console.log(chalk.blue(JSON.stringify(userMapping[socket.id])));
    io.emit(USER_CONNECTED, Object.values(userMapping));
  });

  // When a user sends a message
  socket.on(CHAT_MESSAGE, (message:Message) => {
    // echo to everyone including sender
    console.log(chalk.hex("#007bff")("user has send a message"))
    io.emit(CHAT_MESSAGE, message);
  })

  // When a user is disconnected!
  socket.on("disconnect", () => {
    console.log(chalk.red(`A user disconnected with socket ID ==> ${socket.id}`));
    if(userMapping[socket.id]){
      console.log(chalk.red(`A user disconnected with socket ID ==> ${socket.id}`));
      delete userMapping[socket.id];
      io.emit(USER_DISCONNECTED, Object.values(userMapping));
    }
  })
});

server.listen(3000, ()=> console.log(chalk.blue("server is running on port 3000")));

process.on('SIGINT', async () => {
    await pool.end();
    console.log('Database pool closed');
    process.exit(0);
});