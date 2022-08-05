module.exports = function (fastify, opts, done) {
	const Router = fastify;

	Router.get("/", async (req, res) => {
		const data = await ba.BlueArchiveStage.getRaids();
		if (data.length !== 0) {
			res.status(200).send({
				status: 200,
				data
			});
		}
		else {
			res.status(404).send({
				status: 404,
				error: {
					message: "No raids data found!"
				}
			});
		}
	});

	done();
};
