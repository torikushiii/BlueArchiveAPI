module.exports = (function () {
	"use strict";

	const Express = require("express");
	const Router = Express.Router();

	Router.get("/", (req, res) => {
		res.set("Content-Type", "application/json");
		res.status(200).send({
			status: 200,
			data: "No stage ID is given!"
		});
	});

	Router.get("/:id", async (req, res) => {
		res.set("Content-Type", "application/json");

		const stageId = Number.isInteger(Number(req.params.id));
		if (!stageId) {
			res.status(400).send({
				status: 400,
				error: {
					message: "Stage ID must be an number!"
				}
			});

			return;
		}

		const cache = await ba.Cache.get(req.params.id);
		if (cache) {
			res.status(200).send({
				status: 200,
				data: cache.data,
				drops: cache.drops
			});

			return;
		}

		const data = ba.BlueArchiveStage.get(Number(req.params.id));
		if (data) {
			const drops = [];
			const dropData = ba.BlueArchiveDrop.getDropByStageID(Number(data.ID));
			if (dropData) {
				for (const key in dropData) {
					if (Object.keys(dropData).includes(key) && ba.BlueArchiveEquipment.get(dropData[key].stageRewardID)?.name) {
						drops.push(`${ba.BlueArchiveEquipment.get(dropData[key].stageRewardID).name} (%${dropData[key].dropChance})`);
					}
				}
			}

			res.status(200).send({
				status: 200,
				data,
				drops
			});

			await ba.Cache.set({
				key: data.ID,
				value: JSON.stringify({
					data,
					drops
				}),
				expireAt: 1_800_000
			});

			return;
		}
		else {
			res.status(404).send({
				status: 404,
				error: {
					message: "No stage found with this ID!"
				}
			});

			return;
		}
	});

	return Router;
})();
