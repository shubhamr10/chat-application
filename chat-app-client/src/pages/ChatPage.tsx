import { useState, useEffect } from "react";
import { socket } from "../services/socket";
import UserList from "../components/UsersList";
import RoomLists from "../components/RoomsList";
import type { Message, User, Room } from "../types";
import { USER_CONNECTED, USER_DISCONNECTED, SET_USERNAME, CHAT_MESSAGE } from "../contants";
import styles from "../assets/styles/ChatPage.module.css";
import MessageFeed from "../components/MessageFeed";

// Mock data only to be used during dev.
// import { mockUsers, mockMessages, mockRooms } from "../mock/data";


interface ChatPageProps{
    authUser: User;
}



function ChatPage({authUser}: ChatPageProps){
    const [messages, setMessages] = useState<Message[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [rooms, setRooms] = useState<Room[]>([]);

    const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);


    useEffect(() => {
        function onConnect(){
            // Tell the server who this user is
            socket.emit(SET_USERNAME, authUser.username);
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
    }, [authUser.username]);


    function handleSend(content:string):void{
        const message: Message = {
            id: Date.now().toString(),
            content,
            sender: authUser.username,
            timestamp: new Date().toISOString()
        };
        socket.emit(CHAT_MESSAGE, message);
    }
    return (
        <>
        <div className={styles.topContainer}></div>
        <div className={styles.container}>
            <div className={styles.sidebar}>
                <div className={styles.usernameSection}>
                    <span className={`${styles.initials}  poppins-semibold`}>{ authUser.username.charAt(0).toUpperCase() }</span>
                    <span className={`${styles.username}  sansation-regular`}>{authUser.username}</span>
                </div>
                <RoomLists activeRoom={selectedRoom} onRoomSelect={setSelectedRoom} rooms={rooms} />
            </div>
            <div className={styles.chatSection}>
                <MessageFeed handleSend={handleSend} messages={messages} username={authUser.username} />
            </div>
            <div className={styles.onlineUsers}>
                <UserList users={users} handleUserClick={()=>{}} onlineCount={users.length} selectedUser={authUser} />
            </div>
        </div>
        </>
    )
}

export default ChatPage;