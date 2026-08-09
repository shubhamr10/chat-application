import type { Socket, Server } from "socket.io";
import type {SocketUsers} from "../types";
import { registerUserHandler } from "./users";
import { registerMessageHandler } from "./messages";
import { registerRoomHandler } from "./rooms";
import chalk from "chalk";

const userMapping: Record<string, SocketUsers> = {};

export function registerSocketHandlers(io: Server) {
    io.on('connection', (socket: Socket) => {
        console.log(chalk.green(`A user connected: ${socket.id}`));

        registerUserHandler(io, socket, userMapping);
        registerMessageHandler(io, socket);
        registerRoomHandler(io, socket);
    });
}