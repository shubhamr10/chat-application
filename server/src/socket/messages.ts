import type { Server, Socket } from "socket.io";
import type { Message } from "../types";
import { saveMessages } from "../db/messages";
import { CHAT_MESSAGE } from "../constants";
import chalk from "chalk";

export function registerMessageHandler(
    io:Server,
    socket: Socket
){
    socket.on(CHAT_MESSAGE, async (message:Message) => {
        // Get the room this socket is currently in
        // socket.rooms is a Set containing socket.id + all joined rooms
        const roomId = Array.from(socket.rooms).find(room => room !== socket.id);
        console.log(roomId,"finding rooms")

        if(!roomId) return; // not in any room ignore

        // Save messages to database
        const user = socket.data.user;
        await saveMessages(message.content, user.id, Number(roomId));

        io.to(roomId).emit(CHAT_MESSAGE, {
            ...message,
            roomId
        })
        console.log(chalk.hex('#007bff')('user has sent a message'));
    })
}