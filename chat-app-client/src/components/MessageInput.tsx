import React, { useState, useRef } from "react";
import styles from "../assets/styles/MessageInput.component.module.css";
import { socket } from "../services/socket";
import { USER_TYPING, USER_STOPPED_TYPING } from "../contants";

interface MessageInputProps {
    onSend: (content:string) => void;
    roomId:string;
}

function MessageInput({onSend, roomId}:MessageInputProps){
    const [message, setMessage] = useState<string>("");
    const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    function handleChange(e:React.ChangeEvent<HTMLInputElement>){
        setMessage(e.target.value);
        // emit typing
        socket.emit(USER_TYPING, roomId);
        // Clear previous timeout
        if(typingTimeoutRef.current){
            clearTimeout(typingTimeoutRef.current);
        }

        // Auto stop typing after 2 seconds of inactivity
        typingTimeoutRef.current = setTimeout(() => {
            socket.emit(USER_STOPPED_TYPING, roomId);
        }, 1500);
    }

    function handleSubmit(e:React.SubmitEvent<HTMLFormElement>){
        e.preventDefault();
        if(message.trim() === "") return;
        onSend(message.trim());
        setMessage("");
    }

    const handleKeyDown = (e:React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if(message.trim() === "") return;
            onSend(message.trim());
            setMessage("");
            socket.emit(USER_STOPPED_TYPING, roomId);
            // Clear previous timeout
            if(typingTimeoutRef.current){
                clearTimeout(typingTimeoutRef.current);
            }
        }
    };

    return (
        <div className={styles.container}>
            <form id="message-input-id" name="send-message-form" className={styles.input_container} onSubmit={handleSubmit}>
                <input
                    id="message"
                    name="message"
                    type="text"
                    className={styles.message_input}
                    placeholder="Type a message..."
                    value={message}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                />

                <div className={styles.action_buttons}>
                    {/* Attachment / Paperclip Icon */}
                    <button type="button" className={styles.icon_btn} aria-label="Attach file">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                    </svg>
                    </button>

                    {/* Emoji Icon */}
                    <button type="button" className={styles.icon_btn} aria-label="Add emoji">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                        <line x1="9" y1="9" x2="9.01" y2="9" />
                        <line x1="15" y1="9" x2="15.01" y2="9" />
                    </svg>
                    </button>

                    {/* Send Button */}
                    <button type="submit" className={styles.send_btn}>
                    Send
                    </button>
                </div>
            </form>
        </div>
    )
}

export default MessageInput;