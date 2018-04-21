require('./config/config');

const path = require('path'),
	publicPath = path.join(__dirname, '../public'),
	express = require('express'),
	app = express(),
	port = process.env.PORT;


let useByApp = [
	express.static(publicPath),
];

useByApp.map(result => {
	if (result) {
		app.use(result);
	}	
});

app.listen(port, () => {
	console.log(`Started up at port ${port}`);
});