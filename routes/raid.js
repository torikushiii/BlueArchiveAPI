module.exports = function (fastify, opts, done) {
	const Router = fastify;

	Router.get("/", async (req, res) => {
		const region = req.query.region || "global";
		if (!["global", "japan"].includes(region)) {
			return res.badRequest("Invalid region");
		}

		const raidData = await ba.Query.collection(`${region}.RaidData`).find({}).toArray();
		if (!raidData || raidData.length === 0) {
			return res.notFound();
		}

		const stages = {
			current: [],
			upcoming: [],
			ended: []
		};

		for (const raid of raidData) {
			const startAt = raid.startAt;
			const endAt = raid.endAt;
			const now = new Date();

			if (now > startAt && now < endAt) {
				stages.current.push({
					seasonId: raid.id,
					bossName: raid.boss,
					startAt: raid.startAt,
					settleAt: raid.settleAt,
					endAt: raid.endAt
				});
			}
			else if (now < startAt) {
				stages.upcoming.push({
					seasonId: raid.id,
					bossName: raid.boss,
					startAt: raid.startAt,
					settleAt: raid.settleAt,
					endAt: raid.endAt
				});
			}
			else if (now > endAt) {
				stages.ended.push({
					seasonId: raid.id,
					bossName: raid.boss,
					startAt: raid.startAt,
					settleAt: raid.settleAt,
					endAt: raid.endAt
				});
			}
		}

		return res.send(stages);
	});

	done();
};
