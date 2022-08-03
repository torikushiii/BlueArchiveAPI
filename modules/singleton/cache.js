const Redis = require("ioredis");

module.exports = class Cache extends require("./template") {
	/** @type {Redis} */
	#server = null;
	#active = false;
	#version = null;

	/**
     * @returns {Cache}
     */
	static singleton () {
		if (!Cache.module) {
			Cache.module = new Cache();
		}

		return Cache.module;
	}

	constructor () {
		super();

		if (ba.Config.redis_configuration) {
			this.connect(ba.Config.redis_configuration);
		}
		else {
			console.warn("No redis configuration detected - skipping caching");
		}
	}

	connect (configuration) {
		if (this.#active) {
			throw new Error("Already connected to redis");
		}
		else if (this.#server) {
			this.#server.connect();
			this.#active = true;
		}
		else if (!configuration) {
			throw new Error("No configuration provided");
		}
		else if (typeof configuration !== "object" && typeof configuration !== "string") {
			throw new Error("Invalid configuration provided. Must be an object or a string");
		}

		this.#server = new Redis(configuration);
		this.#active = true;

		this.#server.info().then(info => {
			const version = info.split("\n").find(line => line.startsWith("redis_version"));
			if (version) {
				this.#version = version.split(":")[1].split(".").map(Number);
			}
			else {
				console.warn("Could not determine redis version", { info });
			}
		});
	}

	disonnect () {
		if (!this.#active) {
			throw new Error("Not connected to redis");
		}
		else if (!this.#server) {
			throw new Error("No server instance has been created");
		}

		this.#server.disconnect();
		this.#active = false;
	}

	async set (data = {}) {
		if (!this.#active) {
			throw new Error("Not connected to redis");
		}
		else if (typeof data.value === "undefined") {
			throw new Error("No value provided");
		}

		return await this.#server.set(`BlueArchive-${data.key}`, data.value, "PX", data.expireAt);
	}

	async get (prefix) {
		return JSON.parse(await this.#server.get(`BlueArchive-${prefix}`));
	}
};
