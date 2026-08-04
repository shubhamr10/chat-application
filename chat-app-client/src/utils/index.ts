import type { AuthResponse } from "../types";

const USER_TOKEN = "userToken";

export function storeAuthenticationTokenInLocalStorage(userObj:AuthResponse):void{
    localStorage.setItem(USER_TOKEN, JSON.stringify(userObj));
}

export function checkIfTokenIsAvailable():AuthResponse | null{
    const storedUserObject = localStorage.getItem('userToken') ?? null;
    return storedUserObject ? (JSON.parse(storedUserObject) as AuthResponse) : null;
}