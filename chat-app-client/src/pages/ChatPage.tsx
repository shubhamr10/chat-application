import { useState, useEffect } from "react";
import { socket } from "../services/socket";
import UserList from "../components/UsersList";
import RoomLists from "../components/RoomsList";
import type { Message, User, Room, UserPresence } from "../types";
import { USER_CONNECTED, USER_DISCONNECTED, SET_USERNAME, CHAT_MESSAGE, JOIN_ROOM, MESSAGE_HISTORY } from "../contants";
import styles from "../assets/styles/ChatPage.module.css";
import MessageFeed from "../components/MessageFeed";

import { getRooms, getUsers } from "../services/api";

// Mock data only to be used during dev.
// import { mockUsers, mockMessages, mockRooms } from "../mock/data";


interface ChatPageProps{
    authUser: User;
}



function ChatPage({authUser}: ChatPageProps){
    const [messages, setMessages] = useState<Message[]>([]);
    const [users, setUsers] = useState<UserPresence[]>([]);
    const [rooms, setRooms] = useState<Room[]>([]);

    const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

useEffect(() => {
    let mounted = true;

    (async () => {
        try {
            const data = await getRooms();
            if (!mounted) return; // StrictMode unmounted — abort

            setRooms(data.rooms);
            if (data.count > 0) {
                const firstRoom = data.rooms[0];
                setSelectedRoom(firstRoom);

                if (socket.connected) {
                    socket.emit(JOIN_ROOM, String(firstRoom.id));
                } else {
                    socket.once('connect', () => {
                        socket.emit(JOIN_ROOM, String(firstRoom.id));
                    });
                }
            }
        } catch (e) {
            console.error('error while fetching rooms', e);
        }
    })();

    (async ()=> {
        const data = await getUsers();
        setUsers(data.users);
    })();

    return () => {
        mounted = false;
        socket.off('connect'); // remove the once listener on cleanup
    };
}, []);


    useEffect(() => {
        function onConnect(){
            // Tell the server who this user is
            socket.emit(SET_USERNAME, authUser.username);
        }
        // Connect if not already connected
        if (!socket.active) {
            socket.connect();
        } else if (socket.connected) {
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
            getUsers().then(data => setUsers(data.users));
        });
        socket.on(USER_DISCONNECTED, (updatedUser: User[]) => {
            getUsers().then(data => setUsers(data.users));
        });

        socket.on(MESSAGE_HISTORY, (history: Message[]) => {
            setMessages(history);
        });

        // CRITICAL - Cleanup do not skip this
        return () => {
            socket.off("connect", onConnect);
            socket.off(CHAT_MESSAGE);
            socket.off(USER_CONNECTED);
            socket.off(USER_DISCONNECTED);
            socket.off(MESSAGE_HISTORY);
        }
    }, [authUser.username]);


    function handleSend(content:string):void{
        const message: Message = {
            id: Date.now().toString(),
            content,
            sender: authUser.username,
            timestamp: new Date().toISOString(),
            roomId:String(selectedRoom?.id ?? '')
        };
        socket.emit(CHAT_MESSAGE, message);
    }

    function handleRoomSelect(room: Room){
        setSelectedRoom(room);
        setMessages([]); // clear previous room messages
        socket.emit(JOIN_ROOM, String(room.id));
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
                <RoomLists activeRoom={selectedRoom} onRoomSelect={handleRoomSelect} rooms={rooms} />
            </div>
            <div className={styles.chatSection}>
                <MessageFeed handleSend={handleSend} messages={messages} username={authUser.username} roomName={selectedRoom?.name ?? 'Select a room'} />
            </div>
            <div className={styles.onlineUsers}>
                <UserList users={users} handleUserClick={()=>{}} onlineCount={users.length} selectedUser={authUser} />
            </div>
        </div>
        </>
    )
}

export default ChatPage;