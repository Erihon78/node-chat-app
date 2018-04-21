require('./config/config');

const path = require('path'),
	http = require('http'),
	publicPath = path.join(__dirname, '../public'),
	express = require('express'),
	socketIO = require('socket.io'),
	app = express(),
	port = process.env.PORT,
	server = http.createServer(app),
	io = socketIO(server);


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

	socket.emit('newMessage', {
		from: 'Mike',
		text: 'Super dooper is going on.'
	});

	socket.on('createMessage', (message) => {
		console.log('createMessage', message);
	});

	socket.on('disconnect', () => {
		console.log('User was disconnected');
	});
});

server.listen(port, () => {
	console.log(`Started up at port ${port}`);
});