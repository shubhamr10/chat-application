import type { Message } from "../types";
import styles from "../assets/styles/MessageCard.component.module.css";

interface MessageCardProps {
    message: Message;
    isOwn: boolean;
}

function MessageCard({message, isOwn}:MessageCardProps){
    return (
        // <div style={{textAlign: isOwn ? 'right' : 'left'}}>
        //     <strong>{message.sender}</strong>
        //     <p>{message.content}</p>
        //     <small>{new Date(message.timestamp).toLocaleTimeString()}</small>
        // </div>
        <li className={`${styles.message_item} ${isOwn ? styles.self : styles.other}`}>
            {/* Sender Name above the message group */}
            <div className={styles.sender_name}>{message.sender}</div>

            {/* Content wrapper holding avatar and bubble */}
            <div className={styles.content_row}>
                <div className={`${styles.avatar} poppins-bold`}>{message.sender.charAt(0).toLocaleUpperCase()}</div>
                <div className={styles.bubble}>
                {message.content}
                </div>
            </div>

            {/* Timestamp below the message bubble */}
            <div className={styles.timestamp}>{new Date(message.timestamp).toLocaleTimeString()}</div>
        </li>
    );
}

export default MessageCard;