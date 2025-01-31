const socket = io('http://localhost:3000');
socket.on('connect', function () {
  console.log('Connected');

  socket.emit('events', { test: 'test' });
  socket.emit('identity', 0, (response) => console.log('Identity:', response));
});

socket.on('events', function (data) {
  console.log('event', data);
  // chat-list
  const chatList = document.getElementById('chat-list');
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(data));
  chatList.appendChild(div);
});

socket.on('broadcast', function (data) {
  console.log('chat', data);
});

socket.on('exception', function (data) {
  console.log('exception', data);
});

socket.on('disconnect', function () {
  console.log('Disconnected');
});

function _joinRoom(room) {
  console.log(`Joining room: ${room}`);
  socket.emit('join', room);
}

function _sendMessage(message) {
  console.log(`Sending message: ${message}`);
  socket.emit('send', message);
}
