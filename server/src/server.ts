import http from "node:http";
import express from "express";
import { Server } from "socket.io";
import chalk from "chalk";
import authRouter from "./routes/auth";
import {pool} from "./db";
import { authSocket } from "./middleware/authSocket";
import cors from "cors";
import {registerSocketHandlers} from "./socket";


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


// Integrate the authSocket middleware
io.use(authSocket);
registerSocketHandlers(io);

server.listen(3000, ()=> console.log(chalk.blue("server is running on port 3000")));

process.on('SIGINT', async () => {
    await pool.end();
    console.log('Database pool closed');
    process.exit(0);
});