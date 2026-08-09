export interface User {
    id:string;
    username:string;
}

export interface Message{
    id:string;
    content:string;
    sender:string;
    timestamp:string;
    roomId:string;
}

export interface Room{
    id:string;
    name:string;
    created_at:string;
}


export interface SocketUsers extends User {
    socket_id:string;
}