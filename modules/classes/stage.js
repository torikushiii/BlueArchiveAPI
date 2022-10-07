const chalk = require("chalk");

module.exports = class Stage extends require("./template") {
	static data = new Map();

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

	static get (identifier) {
		if (identifier instanceof Stage) {
			return identifier;
		}
		else if (typeof identifier === "number") {
			return Stage.data.get(identifier);
		}
		else {
			console.error(chalk `{red Invalid identifier for Stage.get(). Expected number!}`, {
				identifier,
				type: typeof identifier
			});
		}
	}

	static getStagebyId (identifier) {
		if (identifier instanceof Stage) {
			return identifier;
		}
		else if (typeof identifier === "number") {
			return Stage.data.get(identifier);
		}
		else {
			console.error(chalk `{red Invalid identifier for Stage.getStagebyId(). Expected number!}`, {
				identifier,
				type: typeof identifier
			});
		}
	}

	static async raid () {
		const stages = {
			current: [],
			upcoming: [],
			ended: []
		};
		
		const raidData = await ba.Query.collection("RaidData").find({}).toArray();
		for (const raid of raidData) {
			const startAt = raid.startAt;
			const endAt = raid.endAt;
			const now = new Date();

			if (now > startAt && now < endAt) {
				stages.current.push({
					seasonId: raid.id,
					bossName: raid.boss,
					startAt: new Date(raid.startAt).toUTCString(),
					settleAt: new Date(raid.settleAt).toUTCString(),
					endAt: new Date(raid.endAt).toUTCString()
				});
			}
			else if (now < startAt) {
				stages.upcoming.push({
					seasonId: raid.id,
					bossName: raid.boss,
					startAt: new Date(raid.startAt).toUTCString(),
					settleAt: new Date(raid.settleAt).toUTCString(),
					endAt: new Date(raid.endAt).toUTCString()
				});
			}
			else if (now > endAt) {
				stages.ended.push({
					seasonId: raid.id,
					bossName: raid.boss,
					startAt: new Date(raid.startAt).toUTCString(),
					settleAt: new Date(raid.settleAt).toUTCString(),
					endAt: new Date(raid.endAt).toUTCString()
				});
			}
		}

		return stages;
	}

	static async loadData () {
		const data = await ba.Query.collection("StageDataMain").find({}).toArray();
		if (data.length === 0) {
			throw new Error("No stage data found.");
		}

		for (const stage of data) {
			const stageData = new Stage(stage);
			Stage.data.set(stageData.id, stageData);
		}
	}

	static destroy () {
		Stage.data.clear();
	}
};
