const express = require('express');
const app = express();
const path = require('path');
const http = require('http');
const server = http.createServer(app);
const socketio = require('socket.io');
const fomateMessages = require('./utils/messages');

const { userJoin, getUser, userLeave, getRoomUsers } = require('./utils/users');
const { get } = require('https');


const io = socketio(server);

const botName = 'chatBot';
const PORT = 3000 || process.env.PORT;

// setting the index.html as entry point
app.use(express.static(path.join(__dirname, 'public')));

// run when client connects 
io.on('connection', socket =>
{

	socket.on('joinRoom', ({ username, room }) =>
	{
		const user = userJoin(socket.id, username, room);

		socket.join(room);

		// welcome current user
		socket.emit('message', fomateMessages(botName, 'welcome to chatcord'))

		// boradvast when user connects
		socket.broadcast.to(room).emit('message', fomateMessages(botName, `${username} has joined the chat`))

		// listen for chat message

		socket.on('chatmessage', (message) =>
		{
			const user = getUser(socket.id);

			io.to(room).emit('message', fomateMessages(user.username, message));
		})

		// total number of users in room

		io.to(room).emit('RoomUser', {
			room: user.room,
			users: getRoomUsers(room)
		});

		// runs when clients disconnects
		socket.on('disconnect', () =>
		{
			const user = userLeave(socket.id);

			if (user)
			{

				io.to(room).emit('message', fomateMessages(botName, `${username} has left the chat`))

				// total number of users in room

				io.to(room).emit('RoomUser', {
					users: getRoomUsers(room)
				});
			}
		});

	});

});

server.listen(PORT, () =>
{
	console.log('server running');
})