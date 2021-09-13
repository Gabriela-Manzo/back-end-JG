const { io } = require('../http')

let users = []

const messages = {
  aula: [],
  exercicios: [],
  duvidas: [],
  
}

io.on('connection', socket => {
  socket.on("join.server", (username) => {
    const user = {
      username,
      id: socket.id,
    };
    users.push(user);
    io.emit('new.user', users);
  });

  socket.on("join.room", (roomName, cb) => {
    socket.join(roomName);
    cb(messages[roomName]);
  });

  socket.on("send.message",({ content, to, sender, chatName, isChannel }) => {
    if (isChannel) {
      const payload = {
        content,
        chatName,
        sender,
      };
      socket.to(to).emit("new.message", payload);
    } else {
      const payload = {
        content,
        chatName: sender,
        sender
      };
      socket.to(to).emit("new.message", payload);
    }
    if (messages[chatName]) {
      messages[chatName].push({
        sender,
        content,
      });
    }
  });

  socket.on("disconnect", () => {
    users = users.filter(a => a.id !== socket.id)
    io.emit("new.user", users)
  })
})