import { io } from "socket.io-client";
import { checkIfTokenIsAvailable } from "../utils/index";

const storedUserObject = checkIfTokenIsAvailable();
const token = storedUserObject ? storedUserObject.token : "";
export const socket = io('http://localhost:3000', {
    auth: { token },
    autoConnect: !!token
});

socket.on('connect_error', (err) => {
    console.error('Connection error:', err.message);
});