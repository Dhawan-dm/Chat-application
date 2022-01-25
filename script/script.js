const socket = io('http://localhost:8000');

const form = document.getElementById("send")
const messageSent = document.getElementById('typearea')
const recieve = document.querySelector('.container')

var audio =new Audio('/images/ting.mp3')

const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    recieve.append(messageElement);
    if(position=='left')
    {
        audio.play();
    }
}



form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = messageSent.value;
    append(`You:${message}`,"right");
    socket.emit('send', message);
    messageSent.value='';
})

const name = prompt('Enter Your Name');
socket.emit('user', name);

socket.on('user-joined',name =>{
    append(`${name} joined the chat`,'left');
})

socket.on('recieve', data =>{
append(`${data.name}:${data.message}`,'left');
})

socket.on('left', leave =>{
append(`${leave.name} left the chat`,'left');
})