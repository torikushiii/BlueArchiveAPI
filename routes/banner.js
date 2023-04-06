module.exports = function (fastify, opts, done) {
	const Router = fastify;

	Router.get("/", async (req, res) => {
		const region = req.query.region || "global";
		if (!ba.Utils.isValidRegion(region)) {
			return res.badRequest("Invalid region");
		}
		
		const data = await ba.Utils.getBannerData(region);
		if (data.current.length === 0 && data.ended.length === 0) {
			return res.notFound("No banners found");
		}
        
		res.send(data);
	});

	done();
};
