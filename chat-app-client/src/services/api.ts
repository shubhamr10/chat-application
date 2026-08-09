import type { UserLoginPayload, UserSignUpPayload, AuthResponse } from "../types/index";
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
