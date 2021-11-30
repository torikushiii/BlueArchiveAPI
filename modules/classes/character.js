const chalk = require("chalk");

module.exports = class BlueArchiveCharacter extends require("./template") {
    static data = new Map();
    constructor (data) {
        super();

        this.ID = data.ID;

        this.isReleased = data.isReleased;

        this.isPlayable = data.isPlayable;

        this.character = data.character ?? {};

        this.info = data.info ?? {};

        this.stat = data.stat ?? {};

        this.terrain = data.terrain ?? {};

        this.equipmentType = data.equipmentType ?? [];

        this.tags = data.tags ?? [];
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
            
            const characterSet = new BlueArchiveCharacter({
                ID: key.Id,
                isReleased: (key.ProductionStep === "Release") ? true : false,
                isPlayable: key.IsPlayableCharacter,
                character: {
                    baseStar: key.DefaultStarGrade,
                    rarity: key.Rarity,
                    name: await ba.Utils.getCharacterName(key.LocalizeEtcId),
                    armorType: key.ArmorType,
                    bulletType: key.BulletType,
                    position: key.TacticRange,
                    role: key.TacticRole,
                    squadType: (key.SquadType === "Main") ? "Striker" : "Special",
                    weaponType: key.WeaponType,
                },
                info: {
                    club: key.Club,
                    school: key.School,
                },
                stat,
                terrain,
                equipmentType: key.EquipmentSlot,
                tags: key.Tags,
            });

            BlueArchiveCharacter.data.set(key.Id, characterSet);
        }

        console.log(`${chalk.green("[Loader]")} || ${chalk.red("Loaded")} ${chalk.yellow(BlueArchiveCharacter.data.size)} ${chalk.red("character data")}`);
    }

    static destroy () {
        BlueArchiveCharacter.data.clear();
    }

    /**
	 * Normalizes non-standard strings into standardized equipment name.
	 * Turns input string into lowercase.
	 * @param {string} equipment
	 * @returns {string}
	 */
	static normalizeName (equipment) {
		return equipment.toLowerCase();
	}
}