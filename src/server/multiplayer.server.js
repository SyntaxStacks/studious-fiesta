const _ = require('lodash');
const lobby = require('./lobby.handler')
const game = require('./game.handler')

const wsServer = {
  clients: {},
  init: function sockets (handle) {
    var io = require('socket.io')(handle);
    io.on('connection', function (socket) {
      wsServer.clients[socket.id] = {
        id: socket.id,
        score: 0,
        username: ''
      };

      console.log('a user connected');

      const handlers = [
        lobby,
        game
      ];

      handlers.forEach((handler) => { handler(socket, wsServer) });
    });
    return io;
  }
};

const app = require('express')();
const server = require('http').Server(app);
wsServer.init(server);

server.listen(3000);
