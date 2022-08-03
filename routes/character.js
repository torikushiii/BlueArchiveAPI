module.exports = (function () {
	"use strict";

	const Express = require("express");
	const Router = Express.Router();

	Router.get("/", (req, res) => {
		res.set("Content-Type", "application/json");
		res.status(400).send({
			status: 400,
			data: "No character ID/name is given!"
		});
	});

	Router.get("/query", async (req, res) => {
		res.set("Content-Type", "application/json");
		if (Object.keys(req.query).length === 0) {
			res.status(400).send({
				status: 400,
				message: "No query parameters is given!"
			});
		}
        
		const data = await ba.BlueArchiveCharacter.getCharacterByQuery(req.query);
		res.status(200).send({
			status: 200,
			data
		});
	});

	Router.get("/:id", async (req, res) => {
		res.set("Content-Type", "application/json");

		if (req.query.id) {
			const isId = Boolean(req.query.id === "true");
			if (isId) {
				const cache = await ba.Cache.get(req.params.id);
				if (cache) {
					return res.status(200).send({
						status: 200,
						data: cache
					});
				}

				const data = ba.BlueArchiveCharacter.get(Number(req.params.id));
				if (data) {
					return res.status(200).send({
						status: 200,
						data
					});
				}
			}
		}
		else {
			const cache = await ba.Cache.get(req.params.id);
			if (cache) {
				return res.status(200).send({
					status: 200,
					data: cache
				});
			}

			const data = ba.BlueArchiveCharacter.get(req.params.id);
			if (data) {
				return res.status(200).send({
					status: 200,
					data
				});
			}
		}

		res.status(404).send({
			status: 404,
			message: "Character not found!"
		});
	});

	return Router;
})();
