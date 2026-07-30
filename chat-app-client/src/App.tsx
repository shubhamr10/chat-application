import { useState } from "react";
import LoginPage from "./pages/LoginPage";
import ChatPage from "./pages/ChatPage";


function App(){
  const [username, setUsername] = useState<string>("");

  if(username === ""){
    return <LoginPage onLogin={setUsername}/>
  }
  return <ChatPage username={username} />
}

export default App;