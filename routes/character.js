module.exports = function (fastify, opts, done) {
	const Router = fastify;
	
	Router.get("/", async (req, res) => {
		const data = await ba.BlueArchiveCharacter.getAll();
		if (!data) {
			res.badRequest("No data found (?)");
			return;
		}

		res.send({
			status: 200,
			data
		});
	});

	Router.get("/query", async (req, res) => {
		if (Object.keys(req.query).length === 0) {
			res.badRequest("No query parameters are given!");

			return;
		}
        
		const data = await ba.BlueArchiveCharacter.getCharacterByQuery(req.query);
		if (data) {
			res.send({ data });
		}
		else {
			res.notFound("No character found with that matching query!");
		}
	});

	Router.get("/:id", async (req, res) => {
		if (req.query.id) {
			const isId = Boolean(req.query.id === "true");
			if (isId) {
				const cache = await ba.Cache.get(req.params.id);
				if (cache) {
					res.send({
						status: 200,
						data: cache
					});

					return;
				}

				const data = ba.BlueArchiveCharacter.get(Number(req.params.id));
				if (data) {
					res.send({
						status: 200,
						data
					});

					return;
				}
			}
		}
		else {
			const cache = await ba.Cache.get(req.params.id);
			if (cache) {
				res.send({
					status: 200,
					data: cache
				});

				return;
			}

			const data = ba.BlueArchiveCharacter.get(req.params.id);
			if (data) {
				res.send({
					status: 200,
					data
				});

				return;
			}
		}

		res.notFound("No character with such ID/name was found!");
	});

	done();
};
