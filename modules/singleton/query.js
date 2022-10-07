const { MongoClient } = require("mongodb");
const url = `mongodb://${process.env.MONGO_IP}:${process.env.MONGO_PORT}`;

module.exports = class QuerySingleton extends require("./template") {
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
			throw new Error("Missing MongoDB credentials");
		}
		else {
			this.#pool = new MongoClient(url, {
				useUnifiedTopology: true,
				useNewUrlParser: true,
				keepAlive: true
			});
		}

		this.connect();
	}

	async connect () {
		await this.#pool.connect()
			.then(() => console.log("Connected to MongoDB"))
			.catch(e => console.error(e));

		this.initListeners();
	}

	initListeners () {
		const pool = this.#pool;

		pool.on("serverHeartbeatFailed", () => {
			console.log("Server heartbeat failed");
		});

		pool.on("topologyOpening", () => {
			console.log("Topology opening");
		});

		pool.on("topologyClosed", () => {
			console.log("Topology closed");
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
