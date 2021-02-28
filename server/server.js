const path          = require('path');
const http          = require('http');
const express       = require('express');
const socketIO      = require('socket.io');
//We will first set our path to serve our HTML through the public folder we created:
const publicPath    = path.join(__dirname, '/../public');
const port          = process.env.PORT || 3000;
let app             = express();   
//specify the http method to let HTTP connection in:
let server          = http.createServer(app);
let io              = socketIO(server);

app.use(express.static('public', path));

server.listen(port, ()=> {
    console.log(`Server is up on port ${port}.`)
});

io.on('connection', (socket) => {
    console.log('A user just connected.');

    socket.on('startGame', () => {
        io.emit('startGame');
    })

    socket.on('crazyIsClicked', (data) => {
        io.emit('crazyIsClicked', data);
    });


    socket.on('disconnect', () => {
        console.log('A user has disconnected.');
    })
});