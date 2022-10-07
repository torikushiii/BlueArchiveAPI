const chalk = require("chalk");

module.exports = class Skill extends require("./template") {
	static data = new Map();

	constructor (data) {
		super();

		this.id = data.id;

		this.skillEx = data.skillEx;

		this.normal = data.normal;

		this.passive = data.passive;

		this.sub = data.sub;
	}

	static get (identifier) {
		if (identifier instanceof Skill) {
			return identifier;
		}
		else if (typeof identifier === "number") {
			const values = [...Skill.data.values()];
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
		const data = await ba.Query.collection("SkillListData").find({}).toArray();
		if (data.length === 0) {
			throw new Error("No skill data found.");
		}

		for (const skill of data) {
			const skillData = new Skill(skill);
			Skill.data.set(Symbol(skillData.id), skillData);
		}
	}

	static destroy () {
		Skill.data.clear();
	}

	static normalizeName (name) {
		return name.toLowerCase();
	}
};
