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

socket.on('newLocationMessage', (message) => {
	let li = $('<li></li>');
	li.html(`${message.from}: ${message.url}`);
	$('#messages').append(li);
});

$('#message-form').on('submit', (e) => {
	e.preventDefault();

	let text = $('[name=message]').val();

	socket.emit('createMessage', {
		from: 'User',
		text
	}, () => {
		$('[name=message]').val('');
		console.log('Message sent!')
	});
});

let locationButton = $('#send-location');

locationButton.on('click', () => {
	if (!navigator.geolocation) {
		console.log('Geolocation not supported by your browser!');
	}	

	navigator.geolocation.getCurrentPosition((position) => {
		socket.emit('createLocationMessage', {
			latitude: position.coords.latitude,
			longitude: position.coords.longitude
		});		
	}, () => {
		console.log('Unable to fetch location.');
	});
});