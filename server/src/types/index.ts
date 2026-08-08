export interface User {
    id:string;
    username:string;
}

export interface Message{
    id:string;
    content:string;
    sender:string;
    timestamp:string;
}

export interface Room{
    id:string;
    name:string;
}


export interface SocketUsers extends User {
    socket_id:string;
}