const socketClient = io();


const producto = document.getElementById("producto");
const sendButton = document.getElementById("sendButton");

sendButton.addEventListener("click", ()=>{
    socketClient.emit("messageKey", producto.value);
    producto.value="";
})