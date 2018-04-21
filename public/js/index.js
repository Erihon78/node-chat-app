let socket = io();

socket.on('connect', () => {
	console.log('Connected to server!');

	socket.emit('createMessage', {
		from: 'Oleg',
		text: 'Everything is working fine'
	});
});

socket.on('disconnect', () => {
	console.log('Disconnected from server');
});

socket.on('newMessage', (message) => {
	console.log('New email', message);
});