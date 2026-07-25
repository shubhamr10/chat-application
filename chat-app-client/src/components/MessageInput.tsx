import { useState } from "react";

interface MessageInputProps {
    onSend: (content:string) => void;
}

function MessageInput({onSend}:MessageInputProps){
    const [value, setValue] = useState<string>("");

    function handleSubmit(e:React.SubmitEvent<HTMLFormElement>){
        e.preventDefault();
        if(value.trim() === "") return;
        onSend(value.trim());
        setValue("");
    }

    return (
        <form action="" onSubmit={handleSubmit}>
            <input 
                type="text"
                value={value}
                onChange={e => setValue(e.target.value)}
                placeholder="Type your message..." />
            <button type="submit">Send</button>
        </form>
    )
}

export default MessageInput;