const { Socket } = require('dgram');
const express = require('express');
const http = require('http');
const { Server } = require('socket.io')

const cors = require('cors')

const app = express();
const port = 3000;

const server = http.createServer(app);

// Socket.IO server
const io = new Server(server, { /// io simply means circuit which have all the socket inside it
    cors: {
        origin: '*',
        credentials: true,
    },
});

io.on("connection", (Socket) => {
    console.log("User Connected");
    console.log('id', Socket.id);

    Socket.on('disconnect', () => {
        console.log('User Disconnected', Socket.id);
    });

    Socket.emit('wlcm', `welcome to the server`)

    io.emit('allsokets', 'Recieved mes to all Server');

    Socket.on('msg', (message) => {
        Socket.broadcast.emit('msg', message);
    });
})



app.use(cors({
    origin: '*',
    credentials: true,
}))

app.get('/', (req, res) => {
    res.send(("Hello World!"));
})

server.listen(port, () => {
    console.log(`
                    Server runing on port ${port}
                    `)
})