const chalk = require("chalk");

module.exports = class Stage extends require("./template") {
	static dataGlobal = new Map();
	static dataJapan = new Map();

	constructor (data) {
		super();

		this.id = data.id;

		this.minRank = data.minRank;

		this.staminaCost = data.staminaCost;

		this.battleDuration = data.battleDuration;

		this.maxTurn = data.maxTurn;

		this.stageInfo = data.stageInfo;

		this.objective = data.objective ?? [];

		this.stageData = data.stageData ?? {};
	}

	static get (identifier, region) {
		if (identifier instanceof Stage) {
			return identifier;
		}
		else if (typeof identifier === "number") {
			return Stage.data.get(`${region}-${identifier}`);
		}
		else {
			console.error(chalk `{red Invalid identifier for Stage.get(). Expected number!}`, {
				identifier,
				type: typeof identifier
			});
		}
	}

	static getStagebyId (identifier, region = "global") {
		if (identifier instanceof Stage) {
			return identifier;
		}
		else if (typeof identifier === "number") {
			return Stage.data.get(`${region}-${identifier}`);
		}
		else {
			console.error(chalk `{red Invalid identifier for Stage.getStagebyId(). Expected number!}`, {
				identifier,
				type: typeof identifier
			});
		}
	}

	static async raid (region) {
		const stages = {
			current: [],
			upcoming: [],
			ended: []
		};
		
		const raidData = await ba.Query.collection(`${region}.RaidData`).find({}).toArray();
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

		return stages;
	}

	static async loadData () {
		const regions = ["global", "japan"];

		for (const region of regions) {
			const data = await ba.Query.collection(`${region}.StageDataMain`).find({}).toArray();
			if (data.length === 0) {
				throw new Error(`No stage data found for region ${region}!`);
			}

			for (const stage of data) {
				const stageData = new Stage(stage);
				Stage.data.set(`${region}-${stageData.id}`, stageData);
			}
		}
	}

	static destroy () {
		Stage.data.clear();
	}
};
