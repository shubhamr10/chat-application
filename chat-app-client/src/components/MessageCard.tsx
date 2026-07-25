import type { Message } from "../types";

interface MessageCardProps {
    message: Message;
    isOwn: boolean;
}

function MessageCard({message, isOwn}:MessageCardProps){
    return (
        <div style={{textAlign: isOwn ? 'right' : 'left'}}>
            <strong>{message.sender}</strong>
            <p>{message.content}</p>
            <small>{message.timestamp}</small>
        </div>
    );
}

export default MessageCard;