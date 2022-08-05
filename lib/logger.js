const Logger = require("pino")({
	level: "info",
	transport: {
		target: "pino-pretty",
		options: {
			translateTime: "HH:MM:ss",
			ignore: "pid,hostname"
		}
	}
});

module.exports = Logger;
