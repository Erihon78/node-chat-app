const expect = require('expect'),
	{
		generateMessage
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
		
	});
});