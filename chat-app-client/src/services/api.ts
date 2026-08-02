import type { UserLoginPayload, UserSignUpPayload, AuthResponse } from "../types/index";

export async function register(payload:UserSignUpPayload):Promise<AuthResponse>{
    const response = await fetch("http://localhost:3000/auth/register", {
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(payload)
    });

    // check if the response has issue
    if(!response.ok){
        const errors = await response.json();
        throw new Error(errors.error);
    }

    // if success return the response
    return response.json();
}

export async function login(payload:UserLoginPayload):Promise<AuthResponse> {
    const response = await fetch("http://localhost:3000/auth/login", {
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify(payload)
    });

    // check if the response has issue
    if(!response.ok){
        const errors = await response.json();
        throw new Error(errors.error);
    }

    // if success return the response
    return response.json();
}