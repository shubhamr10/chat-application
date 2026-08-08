import { useState, useEffect } from "react";
import { socket } from "../services/socket";
import MessageCard from "../components/MessageCard";
import MessageInput from "../components/MessageInput";
import UserList from "../components/UsersList";
import type { Message, User, Room } from "../types";
import { USER_CONNECTED, USER_DISCONNECTED, SET_USERNAME, CHAT_MESSAGE } from "../contants";
import styles from "../assets/styles/ChatPage.module.css";

// Mock data only to be used during dev.
import { mockUsers, mockMessages, mockRooms } from "../mock/data";


interface ChatPageProps{
    username: string;
}



function ChatPage({username}: ChatPageProps){
    const [messages, setMessages] = useState<Message[]>(mockMessages);
    const [users, setUsers] = useState<User[]>(mockUsers);
    const [rooms, setRooms] = useState<Room[]>(mockRooms)

    // useEffect(() => {
    //     function onConnect(){
    //         // Tell the server who this user is
    //         socket.emit(SET_USERNAME, username);
    //     }
    //     // Connect if not already connected
    //     if (!socket.connected) {
    //         socket.connect();
    //     } else {
    //         onConnect();
    //     }


    //     // Listen when socket is connected set the username
    //     socket.on("connect", onConnect);

    //     //Listen for incoming messages
    //     socket.on(CHAT_MESSAGE, (message:Message) => {
    //         setMessages((prev):Message[] => [...prev, message])
    //     });

    //     // Listen for user list updates
    //     socket.on(USER_CONNECTED, (updatedUser: User[]) => {
    //         setUsers(updatedUser);
    //     });
    //     socket.on(USER_DISCONNECTED, (updatedUser: User[]) => {
    //         setUsers(updatedUser);
    //     });

    //     // CRITICAL - Cleanup do not skip this
    //     return () => {
    //         socket.off("connect", onConnect);
    //         socket.off(CHAT_MESSAGE);
    //         socket.off(USER_CONNECTED);
    //         socket.off(USER_DISCONNECTED);
    //     }
    // }, [username]);


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
        <>
        <div className={styles.topContainer}></div>
        <div className={styles.container}>
            <div className={styles.sidebar}>
                <div className={styles.username}>
                    <img src="" alt="" />
                    <span>{username}</span>
                </div>
                {/** Room list goes here... */}
            </div>
            <div className={styles.chatSection}>
                <div className={styles.messagesFeed}>
                    {
                        messages.map((msg:Message) => (
                            <MessageCard
                                key={msg.id}
                                message={msg}
                                isOwn={msg.sender === username}
                            />
                        ))
                    }
                </div>
                <MessageInput onSend={handleSend} />
            </div>
            <div className={styles.onlineUsers}>
                <UserList users={users} />
            </div>
        </div>
        </>
    )
}

export default ChatPage;