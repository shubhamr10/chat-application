import { useState } from "react";
import LoginPage from "./pages/LoginPage";
import ChatPage from "./pages/ChatPage";
import SignUpPage from "./pages/SignUpPage";
import { checkIfTokenIsAvailable } from "./utils";


function App(){
  const [username, setUsername] = useState<string>(()=>{
    let token = checkIfTokenIsAvailable();
    return token ? token.userObject.username : "";
  });
  return <SignUpPage/>
  if(username === ""){
    return <LoginPage onLogin={setUsername}/>
  }
  return <ChatPage username={username} />
}

export default App;