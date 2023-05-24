const fastify = require("./lib/fastify");
const logger = require("./lib/logger");

(async function () {
	require("./db-access");
	globalThis.ba = await require("./modules/index")();
	const subroutes = [
		"character",
		"equipment",
		"stage",
		"raid",
		"banner",
		"image"
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

	fastify.get("/buruaka/", async (req, res) => {
		res.send({
			status: 200,
			version: config.version,
			uptime: Math.round(Date.now() - process.uptime() * 1000),
			endpoints: subroutes
		});
	});

	for (const route of subroutes) {
		fastify.register(require(`./routes/${route}`), { prefix: `buruaka/${route}` });
	}

	fastify.get("*", (req, res) => {
		res.notFound("That endpoint does not exist");
	});

	fastify.get("/buruaka", (req, res) => {
		res.redirect(302, "/buruaka/");
	});

	fastify.listen({ port: config.port, host: config.host });
})();
