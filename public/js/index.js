$('body').css({
	background: 'beige'
});

let socket = io();

socket.on('connect', () => {
	console.log('Connected to server!');
});

socket.on('disconnect', () => {
	console.log('Disconnected from server');
});

socket.on('newMessage', (message) => {
	console.log('New message', message);

	let li = $('<li></li>');
	li.text(`${message.from}: ${message.text}`);
	$('#messages').append(li);
});

$('#message-form').on('submit', (e) => {
	e.preventDefault();

	let text = $('[name=message]').val();

	socket.emit('createMessage', {
		from: 'User',
		text
	}, () => {
		console.log('Message sent!')
	});
});