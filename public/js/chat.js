let socket = io();

const scrollToBottom = () => {
	let messages = $('#messages'),
		newMessage = messages.children('li:last-child'),
		clientHeight = messages.prop('clientHeight'),
		scrollTop = messages.prop('scrollTop'),
		scrollHeight = messages.prop('scrollHeight'),
		newMessageHeight = newMessage.innerHeight(),
		lastMessageHeight = newMessage.prev().innerHeight();

	if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
		messages.scrollTop(scrollHeight);
	}
};

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
	scrollToBottom();
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
	scrollToBottom();
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