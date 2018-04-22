const expect = require('expect'),
	{
		generateMessage,
		generateLocationMessage
	} = require('./message');

describe('generateMessage', () => {
	it('should generate correct message object', () => {
		let from = 'Jen',
			text = 'Some message',
			message = generateMessage(from, text);

		expect(typeof message.createdAt).toBe('number');
		expect(message).toMatchObject({
			from,
			text
		});
	});
});

describe('generateLocationMessage', () => {
	it('should generate correct location object', () => {
		let from = 'Admin',
			lat = 50,
			lng = 23,
			url = `My <a href="https://google.com/maps?q=${lat},${lng}" target="_blank">location</a>`,
			locationMessage = generateLocationMessage(from, lat, lng);

		expect(typeof locationMessage.createdAt).toBe('number');
		expect(locationMessage).toMatchObject({
			from,
			url
		});
	});
});