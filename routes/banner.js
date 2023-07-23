module.exports = function (fastify, opts, done) {
	const Router = fastify;

	Router.get("/", async (req, res) => {
		const region = req.query.region || "global";
		if (!["global", "japan"].includes(region)) {
			return res.badRequest("Invalid region");
		}

		const bannerData = await ba.Utils.getBannerData(region);

		return res.send(bannerData);
	});

	done();
};
