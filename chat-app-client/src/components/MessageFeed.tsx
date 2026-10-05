import styles from "../assets/styles/MessageFeed.component.module.css";
import type { Message } from "../types";
import MessageCard from "./MessageCard";
import MessageInput from "./MessageInput";

interface MessageFeedPropsList{
    messages:Message[];
    handleSend:(message:string)=>void;
    username:string;
    roomName:string;
    roomId:string;
    typingUsers:string[];
}

function MessageFeed({ messages, handleSend, username, roomName, roomId, typingUsers }:MessageFeedPropsList){
    return (
        <div className={styles.MessageFeedContainer}>
            <header className={styles.header_container}>
                <h2 className={`${styles.title} poppins-semibold`}>{`#${roomName}`}</h2>
                <p className={`${styles.description} poppins-regular`}>{"A place where all the colaboration comes to a single place"}</p>
                {typingUsers.length > 0 && (
                    <small>
                        {typingUsers.join(', ')} {typingUsers.length === 1 ? 'is' : 'are'} typing...
                    </small>
                )}
            </header>
            <ul className={styles.messages_list}>
                {
                    messages.map((msg:Message) => (
                            <MessageCard
                                key={msg.id}
                                message={msg}
                                isOwn={msg.sender === username}
                            />
                        ))
                    }
            </ul>
            <MessageInput onSend={handleSend} roomId={roomId} />
        </div>
    )
}

export default MessageFeed;