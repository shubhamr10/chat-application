import type { Socket, Server } from "socket.io";
import type { Room } from "../types";
import { JOIN_ROOM, LEAVE_ROOM } from "../constants";


export function registerRoomHandler(
    io:Server,
    socket: Socket,
){
    socket.on(JOIN_ROOM, (roomId:string) => {
        // Leave all previous rooms first (except the default socket room)
        console.log(socket.rooms);
        Array.from(socket.rooms)
            .filter(room => room !== socket.id)
            .forEach(room => socket.leave(room));

        // Jon the new room
        socket.join(roomId);
        console.log(`${socket.data.user.username} joined room ${roomId}`);
    })
}