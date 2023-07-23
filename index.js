const fastify = require("./lib/fastify");

(async function () {
	require("./db-access.js");

	const initGlobals = require("./core/index.js");
	globalThis.ba = await initGlobals();

	const subroutes = [
		["character", true],
		["raid", true],
		["banner", true],
		["image", false]
	];

	const config = ba.Config;
	if (!config.host || !config.port) {
		console.error("Config file is missing host or port");
		process.exit(1);
	}

	fastify.get("/robots.txt", (req, res) => {
		res.type("text/plain");
		res.send("User-agent: *\nDisallow: /");
	});

	fastify.get("/buruaka/", (req, res) => {
		// eslint-disable-next-line max-nested-callbacks
		const endpoints = subroutes.filter((route) => route[1]).map((route) => route[0]);

		res.send({
			status: 200,
			uptime: Math.round(Date.now() - process.uptime() * 1000),
			endpoints
		});
	});

	for (const route of subroutes) {
		const routeName = route[0];
		fastify.register(require(`./routes/${routeName}.js`), { prefix: `buruaka/${routeName}` });
	}

	fastify.get("*", (req, res) => {
		res.notFound();
	});

	fastify.get("/buruaka", (req, res) => {
		res.redirect(301, "/buruaka/");
	});

	fastify.listen({ port: config.port, host: config.host });
})();
