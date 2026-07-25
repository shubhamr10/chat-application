export interface Message{
    id:string;
    content:string;
    sender:string;
    timestamp:string;
};

export interface Room{
    id:string;
    name:string;
}

export interface User{
    id:string;
    username:string;
}
