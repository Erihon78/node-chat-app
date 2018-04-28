require('./config/config');

const path = require('path'),
	http = require('http'),
	publicPath = path.join(__dirname, '../public'),
	express = require('express'),
	socketIO = require('socket.io'),
	{
		generateMessage,
		generateLocationMessage
	} = require('./utils/message'),
	{
		isRealString
	} = require('./utils/validation'),
	{
		Users
	} = require('./utils/users'),
	app = express(),
	port = process.env.PORT,
	server = http.createServer(app),
	io = socketIO(server),
	users = new Users();


let useByApp = [
	express.static(publicPath),
];

useByApp.map(result => {
	if (result) {
		app.use(result);
	}
});

io.on('connection', (socket) => {
	console.log('New user connected');

	socket.on('join', (params, callback) => {
		if (!isRealString(params.name) || !isRealString(params.room)) {
			callback('Name and room name are required.');
		}

		socket.join(params.room)

		users.removeUser(socket.id);
		users.addUser(socket.id, params.name, params.room);

		io.to(params.room).emit('updateUserList', users.getUserList(params.room));
		socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
		socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`));
		callback();
	});

	socket.on('createMessage', (message, callback) => {
		console.log('createMessage', message);
		io.emit('newMessage', generateMessage(message.from, message.text));
		callback();
	});

	socket.on('createLocationMessage', (coords) => {
		io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
	});

	socket.on('disconnect', () => {
		let user = users.removeUser(socket.id);

		if (user) {
			io.to(user.room).emit('updateUserList', users.getUserList(user.room));
			io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
		}
	});
});

server.listen(port, () => {
	console.log(`Started up at port ${port}`);
});