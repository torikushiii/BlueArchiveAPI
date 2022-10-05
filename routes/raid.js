module.exports = function (fastify, opts, done) {
	const Router = fastify;

	Router.get("/", async (req, res) => {
		const data = await ba.BlueArchiveStage.getRaids();
		if (data.upcoming.length !== 0 || data.current.length !== 0 || data.ended.length !== 0) {
			res.send({ data });
		}
		else {
			res.notFound("No raid data found");
		}
	});

	done();
};
