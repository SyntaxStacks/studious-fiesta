const _ = require('lodash');

module.exports = function (socket, server) {
  const lobby = {
    get current_user () {
      return lobby.users[lobby.socket.id];
    },

    onDisconnect: function () {
      console.log('a user disconnected');
      lobby.socket.broadcast.emit('leave', lobby.current_user);
      delete lobby.users[lobby.current_user.id];
    },

    onChat: function (data) {
      lobby.socket.broadcast.emit('chat', {
        username: lobby.current_user.username,
        message: data.message
      });
    },

    onJoin: function (data) {
      lobby.current_user.username = data.username;
      // lobby.users[lobby.current_user.id] = lobby.current_user;
      const userList = _.transform(_.omit(lobby.users, lobby.current_user.id), (arr, user) => {
        arr.push(user);
        return arr;
      }, []);

      console.log(userList);
      lobby.socket.emit('enter', {
        users: userList,
        id: lobby.current_user.id
      });
      lobby.socket.broadcast.emit('userEnter', lobby.current_user);

      if (Object.keys(lobby.users).length >= 1 && !lobby.gameStartTimout) {
        // lobby.gameStartTimeout = setTimeout(game.startGame.bind(game), 10000);
        console.log('starting game');
      }
    }
  };

  lobby.socket = socket;
  lobby.users = server.clients;
  lobby.socket.on('join', lobby.onJoin.bind(lobby));
  lobby.socket.on('chat', lobby.onChat.bind(lobby));
  lobby.socket.on('disconnect', lobby.onDisconnect.bind(lobby));

  return lobby
};
