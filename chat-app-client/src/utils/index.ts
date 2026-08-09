import type { AuthResponse } from "../types";

const USER_TOKEN = "userToken";
const BASE_URL = 'http://localhost:3000';

export function storeAuthenticationTokenInLocalStorage(userObj:AuthResponse):void{
    sessionStorage.setItem(USER_TOKEN, JSON.stringify(userObj));
}

export function checkIfTokenIsAvailable():AuthResponse | null{
    const storedUserObject = sessionStorage.getItem('userToken') ?? null;
    return storedUserObject ? (JSON.parse(storedUserObject) as AuthResponse) : null;
}

export async function apiCall<T>(    
    url: string,
    method: 'GET' | 'POST',
    payload?: unknown,
    additionalHeaders?: Record<string, string>
):Promise<T>{
    // Build auth header if token exists
    const stored = checkIfTokenIsAvailable();
    const authHeader: Record<string, string> = stored
        ? { 'Authorization': `Bearer ${stored.token}` }
        : {};

    const response = await fetch(`${BASE_URL}${url}`, {
    method,
    headers: {
        'Content-Type': 'application/json',
        ...authHeader,           // spread auth header if exists
        ...additionalHeaders,    // spread any extra headers caller passes
    },
    body: method === 'POST' && payload
        ? JSON.stringify(payload)
        : undefined
    });

    if (!response.ok) {
        const errors = await response.json();
        throw new Error(errors.error);
    }

    return response.json();
}