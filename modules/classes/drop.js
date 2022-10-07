const chalk = require("chalk");

module.exports = class Drops extends require("./template") {
	static data = new Map();

	constructor (data) {
		super();

		this.id = data.id;

		this.tag = data.tag;

		this.stageRewardId = data.stageRewardId;

		this.dropAmount = data.dropAmount;

		this.dropChance = data.dropChance;
	}

	static get (identifier) {
		if (identifier instanceof Drops) {
			return identifier;
		}
		else if (typeof identifier === "number") {
			const values = [...Drops.data.values()];
			const dropData = values.filter(i => i.stageRewardId === identifier);
			return dropData;
		}
		else {
			console.error(chalk `{red Invalid identifier for Drops.get(). Expected number!}`, {
				identifier,
				type: typeof identifier
			});
		}
	}

	static getDropbyStage (identifier) {
		if (identifier instanceof Drops) {
			return identifier;
		}
		else if (typeof identifier === "number") {
			const values = [...Drops.data.values()];
			const dropData = values.filter(i => i.id === identifier);
			return dropData;
		}
		else {
			console.error(chalk `{red Invalid identifier for Drops.getDropbyStage(). Expected number!}`, {
				identifier,
				type: typeof identifier
			});
		}
	}

	static async loadData () {
		const data = await ba.Query.collection("DropDataMain").find({}).toArray();
		if (data.length === 0) {
			throw new Error("No drop data found.");
		}

		for (const drop of data) {
			const dropData = new Drops(drop);
			Drops.data.set(Symbol(dropData.id), dropData);
		}
	}

	static destroy () {
		Drops.data.clear();
	}
};
