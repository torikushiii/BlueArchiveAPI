module.exports = function (fastify, opts, done) {
	const Router = fastify;

	Router.get("/", (req, res) => {
		res.send({ data: "No stage ID is given!" });
	});

	Router.get("/:id", async (req, res) => {
		const isNumber = Number.isInteger(Number(req.params.id));
		if (!isNumber) {
			res.badRequest("Stage ID must be an number!");

			return;
		}

		const stageId = Number(req.params.id);
		const data = ba.Stage.get(stageId);
		if (data) {
			const drops = [];
			const dropData = ba.Drops.getDropbyStage(stageId);
			if (dropData.length !== 0) {
				for (const drop of dropData) {
					const loc = await ba.Utils.getEquipmentData(drop.stageRewardId);
					if (loc) {
						drops.push({
							id: drop.id,
							...loc,
							droprate: drop.dropChance / 100
						});
					}
				}
			}

			res.send({ data, drops });
		}
		else {
			res.notFound("No stage found with this ID!");

			return;
		}
	});

	done();
};
