import type { Socket, Server } from "socket.io";
import type { SocketUsers } from "../types";
import type { TokenPayload } from "../middleware/authSocket";
import { USER_CONNECTED, USER_DISCONNECTED, SET_USERNAME } from "../constants";
import chalk from "chalk";


export function registerUserHandler(
    io:Server,
    socket:Socket,
    userMapping:Record<string, SocketUsers>
){
    socket.on(SET_USERNAME, () => {
        const user:TokenPayload = socket.data.user as TokenPayload;
        console.log("SET_USERNAME", JSON.stringify(user));
        userMapping[socket.id] = {
            socket_id : socket.id,
            username: user.username,
            id: socket.data.user.id
        };
        io.emit(USER_CONNECTED, Object.values(userMapping).map(user => ({
            id: user.id,
            username:user.username
        })))
    });

    socket.on("disconnect" , ()=>{
        console.log(chalk.red("disconnect called!", JSON.stringify(userMapping)))
        if (userMapping[socket.id]) {
            delete userMapping[socket.id];
            io.emit(USER_DISCONNECTED, Object.values(userMapping).map(u => ({
                id: u.id,
                username: u.username
            })));
            console.log(chalk.red(`A user disconnected with socket ID ==> ${socket.id}`));
        }
    });
}