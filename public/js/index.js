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

socket.on('newLocationMessage', (message) => {
	let li = $('<li></li>');
	li.html(`${message.from}: ${message.url}`);
	$('#messages').append(li);
});

$('#message-form').on('submit', (e) => {
	e.preventDefault();

	let messageTextbox = $('[name=message]'),
		text = messageTextbox.val();

	socket.emit('createMessage', {
		from: 'User',
		text
	}, () => {
		messageTextbox.val('');
		console.log('Message sent!')
	});
});

let locationButton = $('#send-location');

locationButton.on('click', () => {
	if (!navigator.geolocation) {
		console.log('Geolocation not supported by your browser!');
	}

	locationButton.attr('disabled', 'disabled').text('Sending location...');

	navigator.geolocation.getCurrentPosition((position) => {
		locationButton.removeAttr('disabled').text('Send location');
		
		socket.emit('createLocationMessage', {
			latitude: position.coords.latitude,
			longitude: position.coords.longitude
		});
	}, () => {
		locationButton.removeAttr('disabled').text('Send location');
		console.log('Unable to fetch location.');
	});
});