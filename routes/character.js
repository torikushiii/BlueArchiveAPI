module.exports = function (fastify, opts, done) {
	const Router = fastify;
	
	Router.get("/", async (req, res) => {
		const region = req.query.region || "global";
		if (!ba.Utils.isValidRegion(region)) {
			return res.badRequest("Invalid region");
		}

		const data = await ba.Character.getAll(region);
		if (!data) {
			return res.notFound("No data found (?)");
		}

		return res.send({ data });
	});

	Router.get("/query", async (req, res) => {
		if (Object.keys(req.query).length === 0) {
			res.badRequest("No query parameters are given!");

			return;
		}
        
		const data = ba.Character.getCharacterbyQuery(req.query);
		if (data) {
			res.send(data);
		}
		else {
			res.notFound("No character found with that matching query!");
		}
	});

	Router.get("/:id", async (req, res) => {
		const region = req.query.region || "global";
		if (!ba.Utils.isValidRegion(region)) {
			return res.badRequest("Invalid region");
		}

		if (req.query.id) {
			const isId = Boolean(req.query.id === "true");
			if (isId) {
				const data = ba.Character.get(Number(req.params.id), region);
				if (data) {
					return res.send(data);
				}
			}
		}
		else {
			const data = ba.Character.get(req.params.id, region);
			if (data) {
				const parsedCharacter = await ba.Character.parseCharacterData(data, { region });
				return res.send(parsedCharacter);
			}
		}

		res.notFound("No character with such ID/name was found!");
	});

	done();
};
