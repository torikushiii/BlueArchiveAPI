module.exports = function (fastify, opts, done) {
	const Router = fastify;

	Router.get("/", (req, res) => {
		res.badRequest("No equipment found");
	});

	Router.get("/:id", async (req, res) => {
		if (req.query.id) {
			const isId = Boolean(req.query.id === "true");
			if (isId) {
				const cache = await ba.Cache.get(req.params.id);
				if (cache) {
					res.send({
						data: cache.data,
						drops: cache.drops
					});

					return;
				}

				const data = ba.BlueArchiveEquipment.get(Number(req.params.id));
				if (data) {
					const drops = ba.BlueArchiveDrop.get(data?.ID) ?? [];

					res.send({
						data,
						drops
					});

					return;
				}
			}
		}
		else {
			const droplist = [];
			const item = req.params.id.toLowerCase();

			const tierRegex = /^t[1-9] (.*)$/;
			const tierMatch = item.match(tierRegex);
			if (tierMatch) {
				const equipData = await ba.Equipment.getDatabyTier(item);
				if (equipData) {
					const drops = ba.Drops.get(equipData.id);
					if (drops) {
						for (const drop of drops) {
							const stageData = ba.Stage.getStagebyId(drop.id);
							droplist.push({
								stageName: stageData.stageInfo.fullName,
								dropAmount: drop.dropAmount,
								dropChance: drop.dropChance / 100
							});
						}

						return res.send({ data: equipData, drops: droplist });
					}
				}
			}

			const data = ba.Equipment.get(item);
			if (data) {
				const drops = ba.Drops.get(data.id);
				return res.send({
					data,
					drops
				});
			}
		}

		res.notFound("No equipment exists with this ID / Name!");
	});

	done();
};
