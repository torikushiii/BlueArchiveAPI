const logger = require("../../lib/logger");

module.exports = class BlueArchiveSkill extends require("./template") {
	static data = new Map();
	constructor (data) {
		super();

		/**
         * Contains character ID.
         * @type {number}
         */
		this.characterID = data.characterID;

		/**
         * Contains the skill data for the ex skill group.
         * @type {ba.SkillData}
         */
		this.ex = data.ex;

		/**
         * Contains the skill data for the public skill group.
         * @type {ba.SkillData}
         */
		this.public = data.public;

		/**
         * Contains the skill data for the passive skill group.
         * @type {ba.SkillData}
         */
		this.passive = data.passive;

		/**
         * Contains the skill data for the leader skill group.
         * @type {ba.SkillData}
         */
		this.leader = data.leader;

		/**
         * Contains the skill data for the extra passive skill group.
         * @type {ba.SkillData}
         */
		this.extraPassive = data.extraPassive;
	}

	static get (identifier) {
		if (identifier instanceof BlueArchiveSkill) {
			return identifier;
		}
		else if (typeof identifier === "number") {
			const values = [...BlueArchiveSkill.data.values()];
			return values.find(value => value.characterID === identifier);
		}
		else {
			return console.warn("Invalid identifier type. Must be a string or a number", {
				identifier,
				type: typeof identifier
			});
		}
	}

	static async loadData () {
		const data = await ba.Query.get("SkillListData");

		for (let i = 0; i < data.length; i++) {
			const skillData = new BlueArchiveSkill({
				characterID: data[i].CharacterId,
				ex: (data[i].ExSkillGroupId)[0] ? await ba.Utils.getSkillData((data[i].ExSkillGroupId)[0]) : null,
				public: (data[i].PublicSkillGroupId)[0] ? await ba.Utils.getSkillData((data[i].PublicSkillGroupId)[0]) : null,
				passive: (data[i].PassiveSkillGroupId)[0] ? await ba.Utils.getSkillData((data[i].PassiveSkillGroupId)[0]) : null,
				leader: (data[i].LeaderSkillGroupId)[0] ? await ba.Utils.getSkillData((data[i].LeaderSkillGroupId)[0]) : null,
				extraPassive: (data[i].ExtraPassiveSkillGroupId)[0] ? await ba.Utils.getSkillData((data[i].ExtraPassiveSkillGroupId)[0]) : null
			});

			BlueArchiveSkill.data.set(i, skillData);
		}

		logger.warn(`Loaded ${BlueArchiveSkill.data.size} skill data`);
	}

	static destroy () {
		BlueArchiveSkill.data.clear();
	}

	static normalizeName (skill) {
		return skill.toLowerCase();
	}
};
