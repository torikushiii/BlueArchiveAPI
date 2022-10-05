module.exports = function (fastify, opts, done) {
	const Router = fastify;

	Router.get("/", async (req, res) => {
		const data = await ba.Utils.getBannerData();
		if (data.current.length === 0 && data.ended.length === 0) {
			return res.notFound("No banners found");
		}
        
		res.send({
			status: 200,
			data
		});
	});

	done();
};
