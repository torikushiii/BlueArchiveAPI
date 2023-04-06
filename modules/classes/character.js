const chalk = require("chalk");

module.exports = class Character extends require("./template") {
	static data = new Map();

	constructor (data) {
		super();

		this.id = data.id;

		this.localizeEtcId = data.localizeEtcId;

		this.name = data.name;

		this.released = data.released;

		this.playable = data.playable;

		this.baseStar = data.baseStar;

		this.rarity = data.rarity;

		this.armorType = this.fixArmorType(data.armorType);

		this.bulletType = data.bulletType;

		this.position = data.position;

		this.role = this.fixRoleType(data.role);

		this.squadType = data.squadType;

		this.weaponType = data.weaponType;

		this.club = data.club;

		this.school = data.school;

		this.equipmentType = data.equipmentType;

		this.tags = data.tags;

		this.region = data.region;
	}

	static get (identifier, region = "global") {
		if (identifier instanceof Character) {
			return identifier;
		}
		else if (typeof identifier === "number") {
			return Character.data.get(`${region}-${identifier}`);
		}
		else if (typeof identifier === "string") {
			const normalized = Character.normalizeName(identifier);
			for (const character of Character.data.values()) {
				if (Character.normalizeName(character.name) === normalized) {
					return character;
				}
			}

			return null;
		}
		else {
			console.error(chalk `{red Invalid identifier for Character.get(). Expected number!}`, {
				identifier,
				type: typeof identifier
			});
		}
	}

	static getCharacterbyQuery (identifier, region = "global") {
		if (identifier instanceof Character) {
			return identifier;
		}
		else if (typeof identifier === "object") {
			const { type, armor, damage, school, role, position, weapon } = identifier;
			if (type === undefined
                && armor === undefined
                && damage === undefined
                && school === undefined
                && role === undefined
                && position === undefined
                && weapon === undefined) {
				return null;
			}

			const values = [...Character.data.values()];
			const data = values.filter(value => ((type) ? Character.normalizeName(value.squadType) === Character.normalizeName(type) : true)
                && ((armor) ? Character.normalizeName(value.armorType) === Character.normalizeName(armor) : true)
                && ((damage) ? Character.normalizeName(value.bulletType) === Character.normalizeName(damage) : true)
                && ((school) ? Character.normalizeName(value.school) === Character.normalizeName(school) : true)
                && ((role) ? Character.normalizeName(value.role) === Character.normalizeName(role) : true)
                && ((position) ? Character.normalizeName(value.position) === Character.normalizeName(position) : true)
                && ((weapon) ? Character.normalizeName(value.weaponType) === Character.normalizeName(weapon) : true)
                && value.playable
                && value.name !== "???"
                && value.name !== "LocalizeError"
				&& value.region === region
			);

			if (data.length === 0) {
				return null;
			}

			return data.map(i => i.name).sort();
		}
		else {
			console.error(chalk `{red Invalid identifier for Character.get(). Expected object!}`, {
				identifier,
				type: typeof identifier
			});
		}
	}

	static async getAll (region = "global") {
		const data = [];

		const values = [...Character.data.values()];
		const character = values.filter(i => i.playable
			&& i.name !== "???"
			&& i.name !== "LocalizeError"
			&& i.region === region
		);

		for (const char of character) {
			const charData = await this.parseCharacterData(char, { allChars: true, region });
			if (!charData) {
				continue;
			}
			
			data.push(charData);
		}

		return data;
	}

	static async loadData () {
		const regions = ["global", "japan"];

		for (const region of regions) {
			const data = await ba.Query.collection(`${region}.CharacterData`).find({}).toArray();
			if (data.length === 0) {
				throw new Error(`No character data found for region ${region}!`);
			}

			for (const character of data) {
				const charData = await ba.Utils.getCharacterName(character.localizeEtcId, region);
				if (!charData) {
					continue;
				}
				
				const characterData = new Character({ ...character, name: charData.name, region });
				Character.data.set(`${region}-${characterData.id}`, characterData);
			}
		}
	}

	static destroy () {
		Character.data.clear();
	}

	fixArmorType (armorType) {
		const types = {
			Unarmed: "Special Armor",
			HeavyArmor: "Heavy Armor",
			LightArmor: "Light Armor"
		};

		return types[armorType] ?? "???";
	}

	fixRoleType (roleType) {
		const types = {
			DamageDealer: "Attacker",
			Tanker: "Tanker",
			Healer: "Healer",
			Supporter: "Supporter",
			Vehicle: "Tactical"
		};

		return types[roleType] ?? "???";
	}

	static async parseCharacterData (data, options = {}) {
		const skills = {
			ex: [],
			normal: [],
			passive: [],
			sub: []
		};

		if (options.allChars) {
			const charData = await ba.Utils.getCharacterData(data.id, options.region);
			if (!charData) {
				return null;
			}

			return {
				id: data.id,
				baseStar: data.baseStar,
				rarity: data.rarity,
				name: data.name,
				profile: charData.info.introduction,
				armorType: data.armorType,
				bulletType: data.bulletType,
				position: data.position,
				role: data.role,
				squadType: data.squadType,
				weaponType: data.weaponType,
				terrain: charData.topology,
				school: data.school
			};
		}

		const region = options.region ?? "global";
		const skillData = ba.Skill.get(data.id, { region });
		if (skillData) {
			for (const [type, name] of Object.entries(skillData)) {
				if (type === "id") {
					continue;
				}

				switch (type) {
					case "skillEx": {
						const exInfo = await ba.Utils.getSkillData(name, region);
						skills.ex.push(...exInfo);
						break;
					}

					case "normal": {
						const normalInfo = await ba.Utils.getSkillData(name, region);
						skills.normal.push(...normalInfo);
						break;
					}

					case "passive": {
						const passiveInfo = await ba.Utils.getSkillData(name, region);
						skills.passive.push(...passiveInfo);
						break;
					}

					case "sub": {
						const subInfo = await ba.Utils.getSkillData(name, region);
						skills.sub.push(...subInfo);
						break;
					}

					default:
						return null;
				}
			}
		}

		const charData = await ba.Utils.getCharacterData(data.id, region);
		return {
			id: data.id,
			isReleased: data.released,
			isPlayable: data.playable,
			character: {
				armorType: data.armorType,
				baseStar: data.baseStar,
				bulletType: data.bulletType,
				name: data.name,
				position: data.position,
				profile: charData.info.introduction,
				rarity: data.rarity,
				role: data.role,
				squadType: data.squadType,
				weaponType: data.weaponType
			},
			info: {
				age: charData.info.age,
				artis: charData.info.artistName,
				birthDate: charData.info.birthDate,
				club: data.club,
				school: data.school,
				schoolYear: charData.info.schoolYear,
				voiceActor: charData.info.voiceActor
			},
			stat: charData.stat,
			terrain: charData.topology,
			skills
		};
	}

	static normalizeName (name) {
		return name
			.toLowerCase()
			.replace(/\s+/g, "_");
	}
};
