import { useState } from "react";
import LoginPage from "./pages/LoginPage";
import ChatPage from "./pages/ChatPage";
import { checkIfTokenIsAvailable } from "./utils";
import type { AuthResponse } from "./types";


function App(){
  const [username, setUsername] = useState<string>(()=>{
    let token = checkIfTokenIsAvailable();
    return token ? token.userObject.username : "";
  });
  if(username === ""){
    return <LoginPage onLogin={setUsername}/>
  }
  return <ChatPage username={username} />
}

export default App;