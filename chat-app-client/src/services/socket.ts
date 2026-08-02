import { io } from "socket.io-client";

const token = localStorage.getItem('token') ?? '';

export const socket = io('http://localhost:3000', {
    auth: { token },
    autoConnect: false
});

socket.on('connect_error', (err) => {
    console.error('Connection error:', err.message);
});