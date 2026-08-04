import { useState, useEffect } from "react";
import { socket } from "../services/socket";
import MessageCard from "../components/MessageCard";
import MessageInput from "../components/MessageInput";
import UserList from "../components/UsersList";
import type { Message, User } from "../types";
import { USER_CONNECTED, USER_DISCONNECTED, SET_USERNAME, CHAT_MESSAGE } from "../contants";



interface ChatPageProps{
    username: string;
}



function ChatPage({username}: ChatPageProps){
    const [messages, setMessages] = useState<Message[]>([]);
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        function onConnect(){
            // Tell the server who this user is
            socket.emit(SET_USERNAME, username);
        }
        // Connect if not already connected
        if (!socket.connected) {
            socket.connect();
        } else {
            onConnect();
        }


        // Listen when socket is connected set the username
        socket.on("connect", onConnect);

        //Listen for incoming messages
        socket.on(CHAT_MESSAGE, (message:Message) => {
            setMessages((prev):Message[] => [...prev, message])
        });

        // Listen for user list updates
        socket.on(USER_CONNECTED, (updatedUser: User[]) => {
            setUsers(updatedUser);
        });
        socket.on(USER_DISCONNECTED, (updatedUser: User[]) => {
            setUsers(updatedUser);
        });

        // CRITICAL - Cleanup do not skip this
        return () => {
            socket.off("connect", onConnect);
            socket.off(CHAT_MESSAGE);
            socket.off(USER_CONNECTED);
            socket.off(USER_DISCONNECTED);
        }
    }, [username]);


    function handleSend(content:string):void{
        const message: Message = {
            id: Date.now().toString(),
            content,
            sender: username,
            timestamp: new Date().toISOString()
        };
        socket.emit(CHAT_MESSAGE, message);
    }
    return (
        <div>
            <UserList users={users} />
            {
                messages.map((msg:Message) => (
                    <MessageCard
                        key={msg.id}
                        message={msg}
                        isOwn={msg.sender === username}
                    />
                ))
            }
            <MessageInput onSend={handleSend} />
        </div>
    )
}

export default ChatPage;