const fastify = require("./lib/fastify");
const logger = require("./lib/logger");

(async function () {
	require("./db-access");
	await require("./modules/index")();
	const subroutes = [
		"character",
		"equipment",
		"stage",
		"raid"
	];

	const config = ba.Config;
	if (!config.host || !config.port) {
		logger.error("Config file is missing host or port");
		process.exit(1);
	}

	fastify.get("/robots.txt", (req, res) => {
		res.type("text/plain");
		res.send("User-agent: *\nDisallow: /");
	});

	fastify.get("/", async (req, res) => {
		res.send({
			status: 200,
			endpoints: subroutes
		});
	});

	for (const route of subroutes) {
		fastify.register(require(`./routes/${route}`), { prefix: `/${route}` });
	}

	fastify.get("*", (req, res) => {
		res.notFound("That endpoint does not exist");
	});

	fastify.listen({ port: config.port, host: config.host });
})();
