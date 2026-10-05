import { useState } from "react";
import LoginPage from "./pages/LoginPage";
import ChatPage from "./pages/ChatPage";
import SignUpPage from "./pages/SignUpPage";
import { checkIfTokenIsAvailable } from "./utils";

import type { User } from "./types";


// import { mockUsers } from "./mock/data";


function App(){
  const [user, setUser] = useState<User | null>(()=>{
    let token = checkIfTokenIsAvailable();
    if(token){
      const authUser:User = {
        id:(token.userObject.id),
        username:token.userObject.username,
        socket_id:""
      };
      return authUser
    }
    return null;
  });

  const [page, setPage] = useState<"login" | "signup">("login");
  if(user === null){
    if(page === "signup"){
      return <SignUpPage onSignUp={setUser} onNavigateToLogin={() => setPage("login")} /> 
    }
    return <LoginPage onLogin={setUser} onNavigateToSignUp={()=>setPage("signup")} />
  }
  return <ChatPage authUser={user} />
}

export default App;