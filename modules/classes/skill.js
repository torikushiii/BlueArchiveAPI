const chalk = require("chalk");

module.exports = class Skill extends require("./template") {
	static dataGlobal = new Map();
	static dataJapan = new Map();

	constructor (data) {
		super();

		this.id = data.id;

		this.skillEx = data.skillEx;

		this.normal = data.normal;

		this.passive = data.passive;

		this.sub = data.sub;
	}

	static get (identifier, region) {
		if (identifier instanceof Skill) {
			return identifier;
		}
		else if (typeof identifier === "number") {
			const data = region === "global" ? Skill.dataGlobal : Skill.dataJapan;
			const values = [...data.values()];
			return values.find(i => i.id === identifier);
		}
		else {
			console.error(chalk `{red Invalid identifier for Skill.get(). Expected number!}`, {
				identifier,
				type: typeof identifier
			});
		}
	}

	static async loadData () {
		const regions = ["global", "japan"];

		for (const region of regions) {
			const data = await ba.Query.collection(`${region}.SkillListData`).find({}).toArray();
			if (data.length === 0) {
				throw new Error(`No skill data found for region ${region}!`);
			}

			for (const skill of data) {
				const skillData = new Skill(skill);
				if (region === "global") {
					Skill.dataGlobal.set(Symbol(skillData.id), skillData);
				}
				else if (region === "japan") {
					Skill.dataJapan.set(Symbol(skillData.id), skillData);
				}
			}
		}
	}

	static destroy () {
		Skill.data.clear();
	}

	static normalizeName (name) {
		return name.toLowerCase();
	}
};
