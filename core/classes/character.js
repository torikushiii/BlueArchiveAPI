module.exports = class Character extends require("./template.js") {
	static data = new Map();

	constructor (data) {
		super();

		this.id = data.id;

		this.name = data.name;

		this.fullname = data.fullname;

		this.localizeEtcId = data.localizeEtcId;

		this.released = data.released;

		this.playable = data.playable;

		this.baseStar = data.baseStar;

		this.rarity = data.rarity;

		this.armorType = this.fixArmor(data.armorType);

		this.bulletType = this.fixBulletType(data.bulletType);

		this.position = data.position;

		this.role = this.fixRoleType(data.role);

		this.squadType = data.squadType;

		this.weaponType = data.weaponType;

		this.club = data.club;

		this.school = data.school;

		this.imageIdentifier = data.imageIdentifier;

		this.equipmentType = data.equipmentType;

		this.tags = data.tags;

		this.region = data.region;
	}

	static async get (identifier, options = {}) {
		if (identifier instanceof Character) {
			return identifier;
		}
		else if (typeof identifier === "number") {
			const region = options.region ?? "global";

			const character = Character.data.get(`${region}.${identifier}`);
			if (!character) {
				return null;
			}

			return character;
		}
		else if (typeof identifier === "string") {
			const region = options.region ?? "global";

			const values = [...Character.data.values()];
			const character = values.find(
				i => i.name.toLowerCase() === identifier.toLowerCase()
				&& i.region === region
			);

			if (!character) {
				return null;
			}

			return character;
		}
		else {
			if (options.getAll) {
				const region = options.region ?? "global";

				const characters = [...Character.data.values()]
					.filter(i => i.region === region)
					.filter(i => i.released === true);

				if (characters.length === 0) {
					return null;
				}

				const data = [];
				for (const character of characters) {
					const parsedCharacter = await this.buildCharacterObject(character, options);
					if (!parsedCharacter) {
						ba.Logger.warn(`Failed to parse character ${character.id}`, character);
						continue;
					}

					data.push(parsedCharacter);
				}

				return data;
			}

			ba.Logger.error("Invalid identifier provided. Must be a number or string.", { identifier, options });
		}
	}

	static async getCharacterByQuery (query, options = {}) {
		const region = options.region ?? "global";

		const {
			armor,
			attack,
			weapon,
			position,
			role,
			school,
			type,
			club
		} = query;

		const characters = [...Character.data.values()]
			.filter(i => i.region === region)
			.filter(i => i.released === true);

		const filteredCharacters = characters.filter(i => {
			if (armor && i.armorType.toLowerCase() !== armor) {
				return false;
			}

			if (attack && i.bulletType.toLowerCase() !== attack) {
				return false;
			}

			if (weapon && i.weaponType.toLowerCase() !== weapon) {
				return false;
			}

			if (position && i.position.toLowerCase() !== position) {
				return false;
			}

			if (role && i.role.toLowerCase() !== role) {
				return false;
			}

			if (school && i.school.toLowerCase() !== school) {
				return false;
			}

			if (type && i.squadType.toLowerCase() !== type) {
				return false;
			}

			if (club && i.club.toLowerCase() !== club) {
				return false;
			}

			return true;
		});

		if (filteredCharacters.length === 0) {
			return null;
		}

		return filteredCharacters.map(i => ({
			id: i.id,
			name: i.name
		}));
	}

	static async loadData () {
		const regions = [
			"global",
			"japan"
		];

		for (const region of regions) {
			const characterData = await ba.Query.collection(`${region}.CharacterData`).find({}).toArray();
			if (characterData.length === 0) {
				ba.Logger.error(`No character data found for ${region}`);
			}

			for (const character of characterData) {
				if (character.playable === false) {
					continue;
				}

				const char = await ba.Utils.getCharacterName(character.localizeEtcId, region);
				if (!char || char.name === "LocalizeError") {
					continue;
				}
				
				const object = new Character({ ...character, name: char.name, region });
				Character.data.set(`${region}.${character.id}`, object);
			}
		}
	}

	static async buildCharacterObject (character, options = {}) {
		const region = options.region ?? "global";

		if (options.getAll) {
			const charData = await ba.Utils.getCharacterData(character, region);
			if (!charData) {
				return null;
			}

			return {
				id: character.id,
				name: charData.name,
				profile: charData.info.introduction,
				rarity: character.rarity,
				baseStar: character.baseStar,
				position: character.position,
				role: character.role,
				armorType: character.armorType,
				bulletType: character.bulletType,
				weaponType: character.weaponType,
				squadType: character.squadType,
				school: character.school,
				terrain: charData.topology
			};
		}

		const skills = {
			ex: [],
			normal: [],
			passive: [],
			sub: []
		};

		const skillData = ba.Skill.get(character.id, { region });
		if (skillData) {
			if (skillData.skillEx) {
				const exSkill = await ba.Utils.getSkillData(skillData.skillEx, region);
				if (exSkill) {
					skills.ex.push(exSkill);
				}
			}

			if (skillData.normal) {
				const normalSkill = await ba.Utils.getSkillData(skillData.normal, region);
				if (normalSkill) {
					skills.normal.push(normalSkill);
				}
			}

			if (skillData.passive) {
				const passiveSkill = await ba.Utils.getSkillData(skillData.passive, region);
				if (passiveSkill) {
					skills.passive.push(passiveSkill);
				}
			}

			if (skillData.sub) {
				const subSkill = await ba.Utils.getSkillData(skillData.sub, region);
				if (subSkill) {
					skills.sub.push(subSkill);
				}
			}
		}

		const charData = await ba.Utils.getCharacterData(character, region);
		if (!charData) {
			return null;
		}

		delete charData.stat._id;

		let image = {};
		if (ba.Config.domain && ba.Config.domain !== null) {
			image = this.getImage(character.imageIdentifier, ba.Config.domain);
		}

		return {
			id: character.id,
			isReleased: character.released,
			isPlayable: character.playable,
			character: {
				name: character.name,
				fullname: charData.info.fullName,
				baseStar: character.baseStar,
				rarity: character.rarity,
				armorType: character.armorType,
				bulletType: character.bulletType,
				position: character.position,
				role: character.role,
				squadType: character.squadType,
				weaponType: character.weaponType,
				profile: charData.info.introduction
			},
			info: {
				age: charData.info.age,
				birthDate: charData.info.birthDate,
				height: charData.info.height,
				artist: charData.info.artistName,
				club: character.club,
				school: character.school,
				schoolYear: charData.info.schoolYear,
				voiceActor: charData.info.voiceActor
			},
			image,
			stat: charData.stat,
			terrain: charData.topology,
			skills
		};
	}
	
	fixRoleType (roleType) {
		const types = {
			DamageDealer: "Dealer",
			Tanker: "Tank",
			Healer: "Healer",
			Supporter: "Support",
			Vehicle: "T.S."
		};

		return types[roleType] ?? "???";
	}

	fixBulletType (bulletType) {
		const types = {
			Explosion: "Explosive",
			Mystic: "Mystic",
			Penetration: "Piercing"
		};

		return types[bulletType] ?? bulletType;
	}

	fixArmor (armor) {
		const types = {
			Unarmed: "Special",
			HeavyArmor: "Heavy",
			LightArmor: "Light",
			ElasticArmor: "Elastic"
		};

		return types[armor] ?? armor;
	}

	static getImage (identifier, domain) {
		return {
			icon: `${domain}/image/icon/${identifier}`,
			lobby: `${domain}/image/lobby/${identifier}`,
			portrait: `${domain}/image/portrait/${identifier}`
		};
	}
};
