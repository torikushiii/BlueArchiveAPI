module.exports = (function () {
	"use strict";

	const Express = require("express");
	const Router = Express.Router();

	Router.get("/", (req, res) => {
		res.set("Content-Type", "application/json");
		res.status(200);
		res.send({
			status: 200,
			data: "No stage ID is given!"
		});
	});

	Router.get("/:id", async (req, res) => {
		res.set("Content-Type", "application/json");

		const cache = await ba.Cache.get(req.params.id);
		if (cache) {
			res.status(200);
			return res.send({
				status: 200,
				data: cache.data,
				drops: cache.drops
			});
		}

		const data = ba.BlueArchiveStage.get(Number(req.params.id));
		if (!data) {
			res.status(404);
			res.send({
				status: 404,
				data: `Incorrect type of ID was given. Expected number instead of ${typeof req.params.id}`
			});
		}
		else {
			const drops = [];
			const dropData = ba.BlueArchiveDrop.getDropByStageID(data.ID);
			if (dropData) {
				for (const key in dropData) {
					if (Object.keys(dropData).includes(key) && ba.BlueArchiveEquipment.get(dropData[key].stageRewardID)?.name) {
						drops.push(`${ba.BlueArchiveEquipment.get(dropData[key].stageRewardID).name} (%${dropData[key].dropChance})`);
					}
				}
			}

			res.status(200);
			res.send({
				status: 200,
				data,
				drops
			});

			return await ba.Cache.set({
				key: data.ID,
				value: JSON.stringify({
					data,
					drops
				}),
				expireAt: 1_800_000
			});
		}
	});

	return Router;
})();
