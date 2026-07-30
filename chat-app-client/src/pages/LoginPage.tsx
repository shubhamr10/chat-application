import React, { useState } from "react";

interface LoginPageProps {
    onLogin:(username:string) => void;
}

function LoginPage({onLogin}: LoginPageProps){
    const [username, setUserName] = useState<string>("");

    function handleSubmit(e: React.SubmitEvent<HTMLFormElement>){
        e.preventDefault();
        console.log(username);
        if(username.trim() === '') return;
        onLogin(username.trim());
    }

    function onChangeHandler(e: React.ChangeEvent<HTMLInputElement>):void{
        const inputValue = e.target.value;
        console.log(inputValue)
        setUserName(inputValue);
    }


    return (
        <div>
            <h2>Welcome to the chat room! Enter your username.</h2>
                <form action="" onSubmit={handleSubmit}>
                    <input type="text" value={username} onChange={onChangeHandler} />
                    <button type="submit">Go to chatroom!</button>
                </form>
        </div>
    )
}

export default LoginPage;