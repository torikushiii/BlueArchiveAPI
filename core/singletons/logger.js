const Debug = require("debug");

module.exports = class LoggerSingleton extends require("./template.js") {
	/**
	 * @returns {LoggerSingleton}
	 */
	static singleton () {
		if (!LoggerSingleton.module) {
			LoggerSingleton.module = new LoggerSingleton();
		}

		return LoggerSingleton.module;
	}

	/**
	 * @hideconstructor
	 */
	constructor () {
		super();

		const logger = Debug("buruaka");

		const log = logger.extend("[ LOG ]:");
		log.log = console.log.bind(console);
		log.enabled = true;
		this.log = log;

		const info = logger.extend("[ INFO ]:");
		info.log = console.info.bind(console);
		info.color = log.color;
		info.enabled = true;
		this.info = info;

		const warn = logger.extend("[ WARN ]:");
		warn.log = console.warn.bind(console);
		warn.color = "9";
		warn.enabled = true;
		this.warn = warn;

		const error = logger.extend("[ ERROR ]:");
		error.log = console.error.bind(console);
		error.color = "196";
		error.enabled = true;
		this.error = error;
	}

	log (message) { this.log(message); }
	info (message) { this.info(message); }
	warn (message) { this.warn(message); }
	error (message) { this.error(message); }

	get modulePath () { return "logger"; }
};
