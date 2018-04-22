let generateMessage = (from, text) => {
	return {
		from,
		text,
		createdAt: new Date().getTime()
	}
};

let generateLocationMessage = (from, lat, lng) => {
	return {
		from, 
		url: `My <a href="https://google.com/maps?q=${lat},${lng}" target="_blank">location</a>`,
		createdAt: new Date().getTime()
	}
}

module.exports = {
	generateMessage,
	generateLocationMessage
}