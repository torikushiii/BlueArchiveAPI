module.exports = function (fastify, opts, done) {
	const Router = fastify;

	Router.get("/", async (req, res) => {
		const region = req.query.region || "global";
		if (!["global", "japan"].includes(region)) {
			return res.badRequest("Invalid region");
		}

		const data = await ba.Character.get(null, { getAll: true, region });
		if (!data) {
			return res.notFound();
		}

		if (req.query.star) {
			const star = Number(req.query.star);
			if (isNaN(star)) {
				return res.badRequest("Invalid character rarity");
			}

			const filteredData = data.filter(i => i.baseStar === star);
			if (filteredData.length === 0) {
				return res.notFound();
			}

			return res.send(filteredData);
		}

		return res.send(data);
	});

	Router.get("/query", async (req, res) => {
		const region = req.query.region || "global";
		if (!["global", "japan"].includes(region)) {
			return res.badRequest("Invalid region");
		}

		for (const key in req.query) {
			req.query[key] = req.query[key].toLowerCase();
		}

		const data = await ba.Character.getCharacterByQuery(req.query, { region });
		if (!data) {
			return res.notFound();
		}

		return res.send(data);
	});

	Router.get("/:character", async (req, res) => {
		const region = req.query.region || "global";
		if (!["global", "japan"].includes(region)) {
			return res.badRequest("Invalid region");
		}

		if (req.query.id) {
			const characterId = Boolean(req.query.id === "true");
			if (characterId) {
				const data = await ba.Character.get(Number(req.params.character), { region });
				if (!data) {
					return res.notFound();
				}

				const parsedCharacter = await ba.Character.buildCharacterObject(data, { region });
				if (!parsedCharacter) {
					return res.notFound("No character data found with that identifier");
				}

				return res.send(parsedCharacter);
			}
		}
		else {
			const data = await ba.Character.get(req.params.character, { region });
			if (!data) {
				return res.notFound();
			}

			const parsedCharacter = await ba.Character.buildCharacterObject(data, { region });
			if (!parsedCharacter) {
				return res.notFound("No character data found with that identifier");
			}

			return res.send(parsedCharacter);
		}

		return res.notFound();
	});

	done();
};
