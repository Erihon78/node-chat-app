let socket = io();

socket.on('connect', () => {
	console.log('Connected to server!');
});

socket.on('disconnect', () => {
	console.log('Disconnected from server');
});

socket.on('newMessage', (message) => {
	let template = $('#message-template').html(),
		createdAt = moment(message.createdAt).format('h:mm a'),
		html = Mustache.render(template, {
			from: message.from,
			text: message.text,			
			createdAt			
		});

	$('#messages').append(html);
});

socket.on('newLocationMessage', (message) => {
	let template = $('#location-message-template').html(),
		createdAt = moment(message.createdAt).format('h:mm a'),
		html = Mustache.render(template, {			
			from: message.from,
			url: message.url,
			createdAt			
		});

	$('#messages').append(html);
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
		console.log('Message sent!');
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
		locationButton.removeAttr('disabled').text('Send location');;
		console.log('Unable to fetch location.');
	});
});