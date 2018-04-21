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
});

server.listen(port, () => {
	console.log(`Started up at port ${port}`);
});