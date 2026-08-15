import type { Server, Socket } from "socket.io";
import { USER_TYPING, USER_STOPPED_TYPING } from "../constants";
import type {TokenPayload} from "../middleware/authSocket";

export function registerTypingHandler(
    io:Server,
    socket:Socket
){
    socket.on(USER_TYPING, ()=> {
        // socket.rooms is a Set containing socket.id + all joined rooms
        const roomId = Array.from(socket.rooms).find(room => room !== socket.id);

        if(!roomId) return; // not in any room ignore

        const user = socket.data.user as TokenPayload;
        socket.to(roomId).emit(USER_TYPING, { username: user.username });
    });

    socket.on(USER_STOPPED_TYPING, () => {
        // socket.rooms is a Set containing socket.id + all joined rooms
        const roomId = Array.from(socket.rooms).find(room => room !== socket.id);

        if(!roomId) return; // not in any room ignore

        const user:TokenPayload = socket.data.user as TokenPayload;
        socket.to(roomId).emit(USER_STOPPED_TYPING, { username: user.username });
    })
}