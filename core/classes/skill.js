module.exports = class Skill extends require("./template.js") {
	static data = new Map();

	constructor (data) {
		super();

		this.id = data.id;

		this.skillEx = data.skillEx;

		this.normal = data.normal;

		this.passive = data.passive;

		this.sub = data.sub;
	}

	static get (identifier, options = {}) {
		if (identifier instanceof Skill) {
			return identifier;
		}
		else if (typeof identifier === "number") {
			const region = options.region ?? "global";

			const skill = Skill.data.get(`${region}.${identifier}`);
			if (!skill) {
				return null;
			}

			const values = [...Skill.data.values()];
			const index = values.findIndex(i => i.id === skill.id);
			if (index === -1) {
				return null;
			}

			return values[index];
		}
		else {
			ba.Logger.error("Invalid identifier type passed to Skill.get()", {
				identifier,
				type: typeof identifier,
				options
			});
		}
	}

	static async loadData () {
		const regions = [
			"global",
			"japan"
		];

		for (const region of regions) {
			const skillData = await ba.Query.collection(`${region}.SkillListData`).find({}).toArray();
			if (skillData.length === 0) {
				ba.Logger.error(`No skill data found for ${region}`);
			}

			for (const skill of skillData) {
				const skillObj = new Skill(skill);
				Skill.data.set(`${region}.${skillObj.id}`, skillObj);
			}
		}
	}
};
