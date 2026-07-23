const socket = io();
const USER_NAME_SOCKET = "USER_NAME_SOCKET";
const USERNAME_SECTION_ID = "userNameContainer";
const CHAT_SECTION_ID = "chatRoomContainer";

// socket CONSTANTS
const SET_USERNAME = "set_username";
const SEND_MESSAGE = "chat_message";
const RECIEVE_MESSAGE = "chat_message";

const USER_CONNECTED = "USER_CONNECTED";
const USER_DISCONNECTED = "USER_DISCONNECTED";

const USERNAME_SECTION = document.getElementById(USERNAME_SECTION_ID);
const CHAT_SECTION = document.getElementById(CHAT_SECTION_ID);

// username forms
const USERNAME_FORM = document.getElementById("userNameInputform");
const MESSAGE_FORM = document.getElementById("messageForm");

const UL_MESSAGE_LISTS = document.getElementById("messageLists");

// Ensure socket is connected successfully
socket.on("connect", ()=> {
    console.log("Connected to socket server! ID:", socket.id);
});


(()=>{
    USERNAME_SECTION.style.display = "none";
    CHAT_SECTION.style.display = "none";
})();

function checkUserNameIsAlreadyThere(){
    const userName = sessionStorage.getItem(USER_NAME_SOCKET);
    if(userName){
        document.getElementById("userNameDisplay").innerText = userName;
        socket.emit(SET_USERNAME, userName);
        return true;
    }
    return false;
}

function setUserName(name){
    sessionStorage.setItem(USER_NAME_SOCKET, name);
    document.getElementById("userNameDisplay").innerText = name;
    socket.emit(SET_USERNAME, userName);
}

function getUserName(){
    return sessionStorage.getItem(USER_NAME_SOCKET);
}

function convertTimeToLocale(timeStamp){
    return new Date(timeStamp * 1000).toLocaleTimeString();
}


const isUserNamePresent = checkUserNameIsAlreadyThere();
console.log("isUserNamePresent", isUserNamePresent);
// set both section as display none;
if(isUserNamePresent){
    // display the chat section.
    CHAT_SECTION.style.display = "flex";
} else {
    // display the userNameSection
    USERNAME_SECTION.style.display = "flex";
}

USERNAME_FORM.addEventListener("submit", (e) => {
    e.preventDefault();
    const userName = document.getElementById("userName").value;
    if(userName){
        // set the userName to SessionStorage
        setUserName(userName);
        USERNAME_SECTION.style.display = "none";
        CHAT_SECTION.style.display = "flex";
        // send the socket to add about the userName
        socket.emit(SET_USERNAME, userName);
    }
})



MESSAGE_FORM.addEventListener("submit", (e) => {
    e.preventDefault();
    const message = document.getElementById("message").value;
    if(message){
        // send the message to the server
        socket.emit(SEND_MESSAGE, message);
        // set the message in the list
        const messageObject = {
            timestamp :Date.now() / 1000,
            messageText:message,
            userName:getUserName()
        };
        addMessage(messageObject, true);
        document.getElementById("message").value = "";
    }
});

socket.on(RECIEVE_MESSAGE, (messageObj) => {
    addMessage(messageObj);
});

socket.on(USER_CONNECTED, (message) => {
    UL_MESSAGE_LISTS.innerHTML += `<li class="user-info">${message}</li>`;
})

socket.on(USER_DISCONNECTED, (message) => {
    UL_MESSAGE_LISTS.innerHTML += `<li class="user-info">${message}</li>`;
})

function addMessage(messageObj, isSelf = false){
    let message = "";
    if(isSelf){
        message = constructMessage(messageObj, isSelf);
    } else {
        message = constructMessage(messageObj);
    }
    UL_MESSAGE_LISTS.innerHTML += message;
}


function constructMessage(messageObj, isSelf = false){
    const { timestamp, messageText, userName } = messageObj;
    const timeLocale = convertTimeToLocale(timestamp);
    let message = "";
    if(isSelf){
        message = `<li class="right-message">
                        <div class="message-list-main">
                            <div class="message-top-container">
                                <div class="message-text">${messageText}</div>
                                <div class="profile-icon-circle"><i class="fa fa-user-o" aria-hidden="true"></i></div>
                            </div>
                            <div class="message-timestamp align-right">Sent at ${timeLocale} by ${userName}</div>
                        </div>
                    </li>`;
    } else {
        message = `<li class="left-message">
                        <div class="message-list-main">
                            <div class="message-top-container">
                                <div class="profile-icon-circle"><i class="fa fa-user-o" aria-hidden="true"></i></div>
                                <div class="message-text">${messageText}</div>
                            </div>
                            <div class="message-timestamp">Sent at ${timeLocale} by ${userName}</div>
                        </div>
                    </li>`;
    }

    return message;
}
