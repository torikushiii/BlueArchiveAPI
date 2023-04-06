const chalk = require("chalk");

module.exports = class Drops extends require("./template") {
	static dataGlobal = new Map();
	static dataJapan = new Map();

	constructor (data) {
		super();

		this.id = data.id;

		this.tag = data.tag;

		this.stageRewardId = data.stageRewardId;

		this.dropAmount = data.dropAmount;

		this.dropChance = data.dropChance;
	}

	static get (identifier, region) {
		if (identifier instanceof Drops) {
			return identifier;
		}
		else if (typeof identifier === "number") {
			const data = region === "global" ? Drops.dataGlobal : Drops.dataJapan;
			const values = [...data.values()];
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
		const regions = ["global", "japan"];

		for (const region of regions) {
			const data = await ba.Query.collection(`${region}.DropDataMain`).find({}).toArray();
			if (data.length === 0) {
				throw new Error(`No drop data found for region ${region}!`);
			}

			for (const drop of data) {
				const dropData = new Drops(drop);
				if (region === "global") {
					Drops.dataGlobal.set(Symbol(dropData.id), dropData);
				}
				else if (region === "japan") {
					Drops.dataJapan.set(Symbol(dropData.id), dropData);
				}
			}
		}
	}


	static destroy () {
		Drops.data.clear();
	}
};
