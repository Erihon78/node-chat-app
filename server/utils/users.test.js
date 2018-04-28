const expect = require('expect'),
	{
		Users,
	} = require('./users');;

describe('Users', () => {
	let users;

	beforeEach(() => {
		users = new Users();
		users.users = [{
			id: '1',
			name: 'Mike',
			room: 'Developers'
		}, {
			id: '2',
			name: 'Harold',
			room: 'Developers'
		}, {
			id: '3',
			name: 'Peter',
			room: 'Spiders'
		}];
	});

	it('should add new user', () => {
		let users = new Users(),
			user = {
				id: '123',
				name: 'Oleg',
				room: 'Developers'
			},
			resUser = users.addUser(user.id, user.name, user.room);

		expect(users.users).toEqual([user]);
	});

	it('should remove a user', () => {
		let user = users.removeUser('3')[0].id;

		expect(user).toBe('3');
		expect(users.users.length).toBe(2);
	});

	it('should not remove user', () => {
		let user = users.getUser('4');

		expect(user).toEqual([]);
		expect(users.users.length).toBe(3);
	});

	it('should find a user', () => {
		let user = users.getUser('3')[0].id;

		expect(user).toBe('3');
	});

	it('should not find user', () => {
		let user = users.getUser('4');

		expect(user).toEqual([]);
	});

	it('should return names for developers', () => {
		let userList = users.getUserList('Developers');

		expect(userList).toEqual(['Mike', 'Harold']);
	});

	it('should return names for spiders', () => {
		let userList = users.getUserList('Spiders');

		expect(userList).toEqual(['Peter']);
	});
});