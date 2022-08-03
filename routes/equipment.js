module.exports = (function () {
	"use strict";

	const Express = require("express");
	const Router = Express.Router();

	Router.get("/", (req, res) => {
		res.set("Content-Type", "application/json");
		res.status(400).send({
			status: 400,
			data: "No equipment ID is given!"
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
						data: cache.data,
						drop: cache.drop
					});
				}

				const data = ba.BlueArchiveEquipment.get(Number(req.params.id));
				if (data) {
					const drops = ba.BlueArchiveDrop.get(data?.ID) ?? [];
					return res.status(200).send({
						status: 200,
						data,
						drop: drops
					});
				}
			}
		}
		else {
			const item = req.params.id.toLowerCase();

			const tierRegex = /^t[1-6] (.*)$/;
			const tierMatch = item.match(tierRegex);
			if (tierMatch) {
				const id = await ba.Utils.getEquipmentTypes(item);
				if (id) {
					const cache = await ba.Cache.get(id);
					if (cache) {
						return res.status(200).send({
							status: 200,
							data: cache.data,
							drop: cache.drop
						});
					}

					const data = ba.BlueArchiveEquipment.get(id);
					if (data) {
						const drops = ba.BlueArchiveDrop.get(data?.ID) ?? [];
						res.status(200).send({
							status: 200,
							data,
							drop: drops
						});

						return await ba.Cache.set({
							key: id,
							value: JSON.stringify({
								data,
								drop: drops
							}),
							expireAt: 1_800_000
						});
					}
				}
			}

			const cache = await ba.Cache.get(item);
			if (cache) {
				return res.status(200).send({
					status: 200,
					data: cache.data,
					drop: cache.drop
				});
			}

			const data = ba.BlueArchiveEquipment.get(item);
			if (data) {
				const drops = ba.BlueArchiveDrop.get(data?.ID) ?? [];
				res.status(200).send({
					status: 200,
					data,
					drop: drops
				});

				return await ba.Cache.set({
					key: item,
					value: JSON.stringify({
						data,
						drop: drops
					}),
					expireAt: 1_800_000
				});
			}
		}

		res.status(404).send({
			status: 404,
			data: "No equipment exists with this ID / Name",
			drop: []
		});
	});

	return Router;
})();
