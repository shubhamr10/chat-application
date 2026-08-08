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
    id:number;
    username:string;
    socket_id: string;
}

// API's interface
export interface UserSignUpPayload{
    username:string;
    email:string;
    password:string;
};

export interface UserLoginPayload{
    email:string;
    password:string;
}

export interface AuthResponse {
    token:string;
    userObject:{
        id:number;
        username:string;
        email:string;
    }
}
