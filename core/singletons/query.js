const { MongoClient } = require("mongodb");
const url = `mongodb://${process.env.MONGO_IP}:${process.env.MONGO_PORT}`;

module.exports = class QuerySingleton extends require("./template.js") {
	/** @type {MongoClient} */
	#pool = null;

	/**
     * @inheritdoc
     * @returns {QuerySingleton}
     */
	static singleton () {
		if (!QuerySingleton.module) {
			QuerySingleton.module = new QuerySingleton();
		}

		return QuerySingleton.module;
	}

	constructor () {
		super();

		if (!process.env.MONGO_IP || !process.env.MONGO_PORT) {
			throw new Error("MONGO_IP and MONGO_PORT environment variables must be set.");
		}
		else {
			this.#pool = new MongoClient(url, {
				useUnifiedTopology: true,
				useNewUrlParser: true
			});
		}

		this.connect();
	}

	async connect () {
		await this.#pool.connect()
			.catch(e => ba.Logger.error(e));

		this.initListeners();
	}

	initListeners () {
		const pool = this.#pool;

		pool.on("serverHeartbeatFailed", () => {
			ba.Logger.error("MongoDB server heartbeat failed.");
		});

		pool.on("topologyOpening", () => {
			ba.Logger.info("MongoDB topology opening.");
		});

		pool.on("topologyClosed", () => {
			ba.Logger.info("MongoDB topology closed.");
		});
	}

	destroy () {
		this.#pool.close();
		this.#pool.removeAllListeners();

		this.#pool = null;
	}

	get client () { return this.#pool.db(process.env.DB_NAME); }

	get modulePath () { return "query"; }
};
