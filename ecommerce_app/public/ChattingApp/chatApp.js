const socket = io(); // 'http://localhost:3000'

socket.on("userMsgReceive", (msg) => {
    addMsgToChatBlock(msg, 'receiveMsg')
}) // -> subscribing


var sendMsg = () => {
    var msg = document.querySelector("#userMsg").value;
    document.querySelector("#userMsg").value = '';
    addMsgToChatBlock(msg, 'sender');

    // socket.emit("userSendMsg", msg);
    socket.emit("userSendMsg", msg);

}

var addMsgToChatBlock = (msg, type) => {
    var divBlock = document.createElement("div");
    divBlock.innerHTML = msg;

    // Apply the appropriate class for styling
    var className = (type === 'sender') ? 'sendMsg' : 'receiveMsg';
    divBlock.setAttribute("class", className);

    // Append the message block to the container
    document.querySelector(".msgContainer").append(divBlock);

    // Automatically scroll to the bottom of the chat container
    var msgContainer = document.querySelector(".msgContainer");
    msgContainer.scrollTop = msgContainer.scrollHeight;
};
