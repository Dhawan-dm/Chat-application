// Node server which will handle socket io connections
const io = require('socket.io')(8000);

const users={};
io.on('connection', socket =>{
    // If any new user joins, let other users connected to the server know!
    socket.on('user', name =>{ 
        //console.log(name);
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
        
    });

    // If someone sends a message, broadcast it to other people
    socket.on('send', message =>{
        socket.broadcast.emit('recieve', {message: message, name: users[socket.id]})
    });
    socket.on('disconnect', message =>{
        socket.broadcast.emit('left', {name:users[socket.id]});
        delete users[socket.id];
    });
});