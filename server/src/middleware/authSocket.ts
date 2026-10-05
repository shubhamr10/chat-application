import jwt from "jsonwebtoken";
import type {Socket} from "socket.io";

export interface TokenPayload {
    id: number;
    username: string;
}

export function authSocket(socket: Socket, next:(err?:Error) => void){
    const token = socket.handshake.auth.token;
    if(!token){
        return next(new Error("Authentication error: No token provided!"));
    }
    try{
        socket.data.user = jwt.verify(token, process.env["JWT_SECRET"] as string) as TokenPayload;
        next();
    } catch (e) {
        console.error(e);
        next(new Error("Authentication error: Invalid token!"));
    }
}