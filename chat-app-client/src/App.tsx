import { useState } from "react";
import LoginPage from "./pages/LoginPage";
import ChatPage from "./pages/ChatPage";
import SignUpPage from "./pages/SignUpPage";
import { checkIfTokenIsAvailable } from "./utils";

// import { mockUsers } from "./mock/data";


function App(){
  const [username, setUsername] = useState<string>(()=>{
    let token = checkIfTokenIsAvailable();
    return token ? token.userObject.username : "";
  });

  const [page, setPage] = useState<"login" | "signup">("login");
  if(username === ""){
    if(page === "signup"){
      return <SignUpPage onSignUp={setUsername} onNavigateToLogin={() => setPage("login")} /> 
    }
    return <LoginPage onLogin={setUsername} onNavigateToSignUp={()=>setPage("signup")} />
  }
  return <ChatPage username={username} />
}

export default App;