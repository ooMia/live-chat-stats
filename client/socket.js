/**
 * This script is used in an HTML file to handle socket connections and events.
 * It connects to a Socket.IO server, listens for various events, and updates the DOM accordingly.
 *
 * @file client/socket.js
 * @module socket
 *
 * @requires socket.io-client
 */
import io from 'socket.io-client';
const socket = io('http://localhost:3000');

/**
 * Connects to the Socket.IO server and sets up event listeners.
 *
 * @event connect - Logs a message when connected and emits 'events' and 'identity' events.
 * @event events - Logs the event data and updates the chat list in the DOM.
 * @event broadcast - Logs broadcast messages.
 * @event exception - Logs exceptions.
 * @event disconnect - Logs a message when disconnected.
 */
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

/**
 * Joins a specified room.
 *
 * @function _joinRoom
 * @param {string} room - name of the room to join
 */

/* eslint-disable @typescript-eslint/no-unused-vars --
 * This function called by `joinRoom()` in html script
 **/
function _joinRoom(room) {
  console.log(`Joining room: ${room}`);
  socket.emit('join', room);
}

/**
 * Sends a message.
 *
 * @function _sendMessage
 * @param {string} message - message to send
 */

/* eslint-disable @typescript-eslint/no-unused-vars --
 * This function called by `sendMessage()` in html script
 **/
function _sendMessage(message) {
  console.log(`Sending message: ${message}`);
  socket.emit('send', message);
}
