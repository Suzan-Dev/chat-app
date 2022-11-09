const express = require('express');
const cors = require('cors');
const fs = require('fs');

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

// Gets the messages.json file and parse the file into JavaScript object
const rawData = fs.readFileSync('messages.json');
const messagesData = JSON.parse(rawData);

socketIO.on('connection', (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);

  socket.on('message', (data) => {
    messagesData['messages'].push(data);

    const stringData = JSON.stringify(messagesData, null, 2);
    fs.writeFile('messages.json', stringData, (err) => {
      console.error(err);
    });

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
  res.json(messagesData);
});

http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
