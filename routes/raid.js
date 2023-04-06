module.exports = function (fastify, opts, done) {
	const Router = fastify;

	Router.get("/", async (req, res) => {
		const region = req.query.region || "global";
		if (!ba.Utils.isValidRegion(region)) {
			return res.badRequest("Invalid region");
		}
		
		const data = await ba.Stage.raid(region);
		if (data.upcoming.length !== 0 || data.current.length !== 0 || data.ended.length !== 0) {
			res.send(data);
		}
		else {
			res.notFound("No raid data found");
		}
	});

	done();
};
