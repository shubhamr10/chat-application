import type { UserLoginPayload, UserSignUpPayload, AuthResponse, UserPresence } from "../types/index";
import { apiCall } from "../utils";
import type { Room } from "../types/index";


// GET - login
export async function login(payload: UserLoginPayload): Promise<AuthResponse> {
    return apiCall('/auth/login', 'POST', payload);
}

// POST - register/signup
export async function register(payload:UserSignUpPayload):Promise<AuthResponse>{
    return apiCall<AuthResponse>("/auth/register", "POST", payload);
}

// GET - get all rooms
export async function getRooms(): Promise<{ rooms: Room[], count: number }> {
    return apiCall<{ rooms: Room[], count: number }>('/rooms', 'GET');
}

// GET - get all users
export async function getUsers(): Promise<{ users: UserPresence[], count:number }> {
    return apiCall<{ users: UserPresence[], count:number }>("/users", "GET");
}