let env = process.env.NODE_ENV || 'development';

console.log('ENV ----->', env);

if (env === 'development' || env === 'test') {
	let config = require('./config.json'),
		envConfig = config[env];

	Object.keys(envConfig).forEach((key) => {
		process.env[key] = envConfig[key];
	});
}

// console.log('JSON_WEB_TOKENS_SECRET ----->', process.env.JWT_SECRET)