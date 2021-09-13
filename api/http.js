const express = require('express');
const cors = require('cors');
const { Server } = require('socket.io');
const http = require('http');

const app = express();
app.use(cors());
const httpServer = http.createServer(app)
const io = new Server(httpServer, {
  cors:{
    origins: ['*']
  }
})
// app.use(express.static('public'));

module.exports = {
  httpServer,
  io
}

