import type { Socket, Server } from "socket.io";
import type {Room, SocketUsers} from "../types";
import { getMessagesByRoom } from "../db/messages";
import { JOIN_ROOM, LEAVE_ROOM, MESSAGE_HISTORY } from "../constants";


export function registerRoomHandler(
    io:Server,
    socket: Socket,
    userMapping:Record<string, SocketUsers>
){
    socket.on(JOIN_ROOM, async (roomId:string) => {
        // Leave all previous rooms first (except the default socket room)
        Array.from(socket.rooms)
            .filter(room => room !== socket.id)
            .forEach(room => socket.leave(room));

        console.log(socket.rooms);
        // Jon the new room
        socket.join(roomId);
        console.log(`${socket.data.user.username} joined room ${roomId}`);
        console.log(JSON.stringify(userMapping));

        const history = await getMessagesByRoom(Number(roomId));
        socket.emit(MESSAGE_HISTORY, history);
    });

    socket.on(LEAVE_ROOM, (roomId: string) => {
        socket.leave(roomId);
    });
}