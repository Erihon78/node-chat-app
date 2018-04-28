const expect = require('expect'),
	{
		isRealString,
	} = require('./validation');

describe('isRealString', () => {
	it('should reject non-string values', () => {
		let str = '';		
		expect(isRealString(str)).toBe(false);
	});

	it('should reject string with only spaces', () => {
		let str = '   ';
		expect(isRealString(str)).toBe(false);
	});

	it('should allow with no-space characters', () => {
		let str = 'name=Oleg';
		expect(isRealString(str)).toBe(true);
	});
});