const logger = require("../../lib/logger");

module.exports = class BlueArchiveCharacter extends require("./template") {
	static data = new Map();
	constructor (data) {
		super();

		/**
         * Unique ID of the character.
         * @type {number}
         */
		this.ID = data.ID;

		/**
         * Whether the character is released or not.
         * @type {boolean}
         */
		this.isReleased = data.isReleased;

		/**
         * Whether the character is playable or not.
         * @type {boolean}
         */
		this.isPlayable = data.isPlayable;

		/**
         * Contains character data.
         * @type {Object}
         */
		this.character = data.character ?? {};

		/**
         * Contains character info data.
         * @type {Object}
         */
		this.info = data.info ?? {};

		/**
         * Contains character stat data.
         * @type {Object}
         */
		this.stat = data.stat ?? {};

		/**
         * Contains character favourable terrain data.
         * @type {Object}
         */
		this.terrain = data.terrain ?? {};

		/**
         * Contains character equipment type.
         * @type {array}
         */
		this.equipmentType = data.equipmentType ?? [];

		/**
         * Contains character skill data.
         * @type {Object}
         */
		this.skill = data.skill ?? {};

		/**
         * Contains character tags.
         * @type {array}
         */
		this.tags = data.tags ?? [];

		/**
         * Contains character extra info.
         * @type {Object}
         */
		this.other = data.other ?? {};
	}

	static get (identifier) {
		if (identifier instanceof BlueArchiveCharacter) {
			return identifier;
		}
		else if (typeof identifier === "number") {
			return BlueArchiveCharacter.data.get(identifier);
		}
		else if (typeof identifier === "string") {
			const characterName = BlueArchiveCharacter.normalizeName(identifier);
			const values = [...BlueArchiveCharacter.data.values()];
			const data = values.find(value => BlueArchiveCharacter.normalizeName(value.character.name) === characterName) ?? null;
			if (data) {
				ba.Cache.set({
					key: data.character.name,
					value: JSON.stringify({ data }),
					expireAt: 1_800_000
				});

				return data;
			}
		}
		else {
			console.error("Invalid character identifier", {
				identifier,
				type: typeof identifier
			});
		}
	}

	static getCharacterByQuery (identifier) {
		if (identifier instanceof BlueArchiveCharacter) {
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

			const values = [...BlueArchiveCharacter.data.values()];
			const data = values.filter(value => ((type) ? ba.BlueArchiveCharacter.normalizeName(value.character.squadType) === ba.BlueArchiveCharacter.normalizeName(type) : true)
                && ((armor) ? ba.BlueArchiveCharacter.normalizeName(value.character.armorType) === ba.BlueArchiveCharacter.normalizeName(armor) : true)
                && ((damage) ? ba.BlueArchiveCharacter.normalizeName(value.character.bulletType) === ba.BlueArchiveCharacter.normalizeName(damage) : true)
                && ((school) ? ba.BlueArchiveCharacter.normalizeName(value.info.school) === ba.BlueArchiveCharacter.normalizeName(school) : true)
                && ((role) ? ba.BlueArchiveCharacter.normalizeName(value.character.role) === ba.BlueArchiveCharacter.normalizeName(role) : true)
                && ((position) ? ba.BlueArchiveCharacter.normalizeName(value.character.position) === ba.BlueArchiveCharacter.normalizeName(position) : true)
                && ((weapon) ? ba.BlueArchiveCharacter.normalizeName(value.character.weaponType) === ba.BlueArchiveCharacter.normalizeName(weapon) : true)
                && value.isPlayable
                && value.character.name !== "???"
                && value.character.name !== "LocalizeError"
			);

			if (data.length === 0) {
				return null;
			}

			return data.map(value => value.character.name).sort();
		}
		else {
			console.error("Invalid character identifier", {
				identifier,
				type: typeof identifier
			});
		}
	}

	static async getAll (type) {
		const data = [];

		if (type === "true" || type === "false") {
			const values = [...BlueArchiveCharacter.data.values()];
			const characters = values.filter(i => i.isReleased === Boolean(type === "true")
				&& i.isPlayable
				&& i.character.name !== "???"
				&& i.character.name !== "LocalizeError"
			);

			for (const character of characters) {
				data.push(this.parseCharacterData(character));
			}

			return data.map(i => i.name);
		}
		else if (typeof type === "undefined") {
			const values = [...BlueArchiveCharacter.data.values()];
			const characters = values.filter(i => i.isPlayable
				&& i.character.name !== "???"
				&& i.character.name !== "LocalizeError"
			);
			
			for (const character of characters) {
				data.push(this.parseCharacterData(character));
			}

			return data;
		}
		else {
			return null;
		}
	}

	static async loadData () {
		const data = await ba.Query.get("CharacterData");
		for (const key of data) {
			const other = await ba.Utils.getCharacterInfo(key.Id);
			const getSkill = ba.BlueArchiveSkill.get(key.Id);

			const characterSet = new BlueArchiveCharacter({
				ID: key.Id,
				isReleased: Boolean(key.ProductionStep === "Release"),
				isPlayable: Boolean(key.IsPlayableCharacter),
				character: {
					baseStar: key.DefaultStarGrade,
					rarity: key.Rarity,
					name: await ba.Utils.getCharacterName(key.LocalizeEtcId),
					profile: other?.ProfileIntroduction?.EN ?? "",
					armorType: this.fixArmorType(key.ArmorType),
					bulletType: (key.BulletType === "Pierce") ? "Penetration" : key.BulletType,
					position: key.TacticRange,
					role: this.fixRoleType(key.TacticRole),
					squadType: (key.SquadType === "Main") ? "Striker" : "Special",
					weaponType: key.WeaponType
				},
				info: {
					club: key?.Club,
					school: key?.School,
					age: other?.CharacterAge?.EN,
					birthDate: other?.BirthDate?.EN,
					artist: other?.ArtistName?.EN ?? other?.ArtistName?.JP,
					voiceActor: other?.VoiceActor?.EN ?? other?.VoiceActor?.JP
				},
				stat: await ba.Utils.getCharacterStat(key.Id),
				terrain: await ba.Utils.getCharacterTerrain(key.Id),
				equipmentType: key.EquipmentSlot,
				skill: {
					EX: getSkill?.ex,
					normal: getSkill?.public,
					passive: getSkill?.passive,
					sub: getSkill?.extraPassive
				},
				tags: key.Tags,
				other
			});

			BlueArchiveCharacter.data.set(key.Id, characterSet);
		}

		logger.info(`Loaded ${BlueArchiveCharacter.data.size} character data`);
	}

	static destroy () {
		BlueArchiveCharacter.data.clear();
	}

	static fixArmorType (armorType) {
		const types = {
			Unarmed: "Special Armor",
			HeavyArmor: "Heavy Armor",
			LightArmor: "Light Armor"
		};

		return types[armorType] ?? "???";
	}

	static fixRoleType (roleType) {
		const types = {
			DamageDealer: "Attacker",
			Tanker: "Tanker",
			Healer: "Healer",
			Supporter: "Supporter",
			Vehicle: "Tactical"
		};

		return types[roleType] ?? "???";
	}

	static parseCharacterData (data) {
		return {
			ID: data.ID,
			...data.character,
			terrain: data.terrain
		};
	}

	/**
	 * Normalizes non-standard strings into standardized character name.
	 * Turns input string into lowercase.
	 * @param {string} character
	 * @returns {string}
	 */
	static normalizeName (character) {
		// Quick check wether string contains Japanese characters.
		if (/[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]/.test(character)) {
			return character;
		}

		return character?.toLowerCase();
	}
};
