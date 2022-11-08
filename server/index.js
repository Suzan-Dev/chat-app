const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 4000;

const http = require('http').Server(app);

app.use(cors());

let users = [];

const socketIO = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:5173',
  },
});

socketIO.on('connection', (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);

  socket.on('message', (data) => {
    socketIO.emit('messageResponse', data);
  });

  socket.on('newUser', (data) => {
    users.push(data);
    socketIO.emit('newUserResponse', users);
  });

  socket.on('typing', (data) => socket.broadcast.emit('typingResponse', data));
  socket.on('typingStopped', (data) => socket.broadcast.emit('typingResponse', data));

  socket.on('disconnect', () => {
    console.log('🔥: A user disconnected');

    users = users.filter((user) => user.socketID !== socket.id);
    socketIO.emit('newUserResponse', users);

    socket.disconnect();
  });
});

app.get('/api', (req, res) => {
  res.json({
    message: 'Hello world',
  });
});

http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
