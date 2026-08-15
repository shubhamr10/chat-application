import type { Socket, Server } from "socket.io";
import type { SocketUsers } from "../types";
import type { TokenPayload } from "../middleware/authSocket";
import { USER_CONNECTED, USER_DISCONNECTED, SET_USERNAME, OFFLINE_GRACE_MS } from "../constants";
import chalk from "chalk";
import { pool } from "../db";
const disconnectTimers:Record<number, ReturnType<typeof setTimeout>> = {};


export function registerUserHandler(
    io:Server,
    socket:Socket,
    userMapping:Record<number, SocketUsers>
){
    socket.on(SET_USERNAME, async () => {
        console.log(chalk.green("set_username called!", JSON.stringify(userMapping)))
        const user:TokenPayload = socket.data.user as TokenPayload;
        // cancel pending offline timers if exists
        if(disconnectTimers[user.id]){
            clearTimeout(disconnectTimers[user.id]);
        }

        // overwrite the previous entry - handle refresh cleanly
        userMapping[user.id] = {
            id:user.id,
            username:user.username,
            socket_id:socket.id
        }

        // update the user table to set this user to online
        await pool.query(`
            UPDATE users SET is_online = TRUE where id=$1
        `,[user.id]);

        // emit users to update the client
        io.emit(USER_CONNECTED, Object.values(userMapping).map(user => ({
            id: user.id,
            username:user.username
        })))
    });

    socket.on("disconnect" , ()=>{
        console.log(chalk.red("disconnect called!", JSON.stringify(userMapping)))
        const user:TokenPayload = socket.data.user as TokenPayload;
        if(!user) return;

        // Only process if this socket is the current one for this user.
        // Prevent old socket disconnected from removing a freshly reconnected user
        if(userMapping[user.id]?.socket_id !== socket.id) return;

        delete userMapping[user.id];

        // Clear typing indicator for this user in all rooms
        const rooms = Array.from(socket.rooms)
            .filter(room => room !== socket.id);

        rooms.forEach(roomId => {
            socket.to(roomId).emit('stop_typing', {
                username: socket.data.user.username
            });
        });

        disconnectTimers[user.id] = setTimeout(async ()=>{
            if(!userMapping[user.id]){
                await pool.query(`
                    UPDATE users SET is_online = FALSE, last_seen = NOW()
                    WHERE id = $1
                `,[user.id]);

                io.emit(USER_DISCONNECTED, Object.values(userMapping).map(u => ({
                    id: u.id,
                    username: u.username
                })));
            }
            delete disconnectTimers[user.id];
        }, OFFLINE_GRACE_MS);

    });
}