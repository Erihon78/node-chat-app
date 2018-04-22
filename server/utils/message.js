const moment = require('moment');

let generateMessage = (from, text) => {
	return {
		from,
		text,
		createdAt: moment().valueOf()
	}
};

let generateLocationMessage = (from, lat, lng) => {
	return {
		from, 
		url: `My <a href="https://google.com/maps?q=${lat},${lng}" target="_blank">location</a>`,
		createdAt: moment().valueOf()
	}
}

module.exports = {
	generateMessage,
	generateLocationMessage
}