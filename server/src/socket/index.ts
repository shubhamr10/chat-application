import type { Socket, Server } from "socket.io";
import type {SocketUsers} from "../types";
import { registerUserHandler } from "./users";
import { registerMessageHandler } from "./messages";
import { registerRoomHandler } from "./rooms";
import { registerTypingHandler } from "./typing";
import chalk from "chalk";

const userMapping: Record<string, SocketUsers> = {};

export function registerSocketHandlers(io: Server) {
    io.on('connection', (socket: Socket) => {
        console.log(chalk.green(`A user connected: ${socket.id}`));
        console.log(JSON.stringify(userMapping));
        registerUserHandler(io, socket, userMapping);
        registerMessageHandler(io, socket);
        registerRoomHandler(io, socket, userMapping);
        registerTypingHandler(io, socket);
    });
}