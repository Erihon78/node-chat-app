class Users {
	constructor() {
		this.users = [];
	}
	addUser(id, name, room) {
		let user = {
			id,
			name,
			room
		};
		this.users.push(user);
		return user;
	}
	removeUser(id) {
		let user = this.getUser(id);

		if (user) {
			this.users = this.users.filter(user => user.id !== id);
		}
		
		return user; 
	}
	getUser(id) {
		let user = this.users.filter(user => user.id === id);
		return user;			
	}
	getUserList (room) {
		let users = this.users.filter(user => user.room === room),
			namesArray = users.map(user => user.name);

		return namesArray;
	}
}

module.exports = {
	Users
}