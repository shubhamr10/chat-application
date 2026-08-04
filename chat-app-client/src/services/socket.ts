import { io } from "socket.io-client";
import type { AuthResponse } from "../types";

const storedUserObject = localStorage.getItem('userToken') ?? '';
const token = storedUserObject ? (JSON.parse(storedUserObject) as AuthResponse).token : "";
export const socket = io('http://localhost:3000', {
    auth: { token },
    autoConnect: !!token
});

socket.on('connect_error', (err) => {
    console.error('Connection error:', err.message);
});