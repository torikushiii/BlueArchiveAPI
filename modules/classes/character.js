const chalk = require("chalk");

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
            if (identifier === "alice") {
                identifier = "aris";
            }

            const characterName = BlueArchiveCharacter.normalizeName(identifier);
            const values = [...BlueArchiveCharacter.data.values()];
            const data = values.find(value => BlueArchiveCharacter.normalizeName(value.character.name) === characterName) ?? null;
            if (data) {
                ba.Cache.set({
                    "key": data.character.name,
                    "value": JSON.stringify({ data }),
                    "expireAt": 1_800_000
                });

                return data;
            }
        }
    }

    static async loadData () {
        const data = require("../../assets/data/CharacterExcelTable.json");
        for (const key of data.DataList) {
            const stat = await ba.Utils.getCharacterStat(key.Id);
            const terrain = await ba.Utils.getCharacterTerrain(key.Id);
            const other = await ba.Utils.getCharacterInfo(key.Id);
            
            const characterSet = new BlueArchiveCharacter({
                ID: key.Id,
                isReleased: (key.ProductionStep === "Release") ? true : false,
                isPlayable: key.IsPlayableCharacter,
                character: {
                    baseStar: key.DefaultStarGrade,
                    rarity: key.Rarity,
                    name: await ba.Utils.getCharacterName(key.LocalizeEtcId),
                    profile: other?.ProfileIntroduction?.EN ?? "",
                    armorType: key.ArmorType,
                    bulletType: key.BulletType,
                    position: key.TacticRange,
                    role: key.TacticRole,
                    squadType: (key.SquadType === "Main") ? "Striker" : "Special",
                    weaponType: key.WeaponType,
                },
                info: {
                    club: key?.Club,
                    school: key?.School,
                    age: other?.CharacterAge?.EN,
                    birthDate: other?.BirthDate?.EN,
                    artist: other?.ArtistName?.EN ?? other?.ArtistName?.JP,
                    va: other?.VoiceActor
                },
                stat,
                terrain,
                equipmentType: key.EquipmentSlot,
                tags: key.Tags,
                other
            });

            BlueArchiveCharacter.data.set(key.Id, characterSet);
        }

        console.log(`${chalk.green("[Loader]")} || ${chalk.red("Loaded")} ${chalk.yellow(BlueArchiveCharacter.data.size)} ${chalk.red("character data")}`);
    }

    static destroy () {
        BlueArchiveCharacter.data.clear();
    }

    /**
	 * Normalizes non-standard strings into standardized character name.
	 * Turns input string into lowercase.
	 * @param {string} character
	 * @returns {string}
	 */
	static normalizeName (character) {
		return character.toLowerCase();
	}
}