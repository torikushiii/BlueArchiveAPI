const fs = require("fs/promises");

module.exports = function (fastify, opts, done) {
	const Router = fastify;

	Router.get("/:type/:slug", async (req, res) => {
		const { type, slug } = req.params;
		if (!type || !slug) {
			return res.redirect(302, "/buruaka/");
		}

		const path = `./images/${type}/${slug}.png`;
		try {
			const file = await fs.readFile(path);
			res.type("image/png");
			res.send(file);
		}
		catch {
			res.notFound("That image does not exist");
		}
	});

	done();
};
