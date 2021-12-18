const chalk = require("chalk");

module.exports = class BlueArchiveEquipment extends require("./template") {
    static data = new Map();
    constructor (data) {
        super();
        
        /**
         * Unique ID of the equipment.
         * @type {number}
         */
        this.ID = data.ID;

        /**
         * Name of the target equipment.
         * @type {string}
         */
        this.name = data.name;

        /**
         * Description of the target equipment.
         * @type {string}
         */
        this.description = data.description;

        /**
         * The type category of the equipment.
         * @type {string}
         */
        this.category = data.category;

        /**
         * The rarity of the equipment.
         * @type {string}
         */
        this.rarity = data.rarity;

        /**
         * The maximum level of the current tier equipment.
         * @type {number}
         */
        this.maxLevel = data.maxLevel;

        /**
         * The recipe ID of the equipment.
         * @type {number}
         */
        this.recipeID = data.recipeID;

        /**
         * The tier of the equipment ranging from 1 to 4.
         * @type {number}
         */
        this.tier = data.tier;

        /**
         * The tags of the equipment.
         * @type {string[]}
         */
        this.tags = (data.tags.length) ? data.tags : null;
    }

    static get (identifier) {
        if (identifier instanceof BlueArchiveEquipment) {
            return identifier;
        }
        else if (typeof identifier === "number") {
            const values = [...BlueArchiveEquipment.data.values()];
            return values.find(value => value.ID === identifier) ?? null;
        }
        else if (typeof identifier === "string") {
            const equipName = BlueArchiveEquipment.normalizeName(identifier);
            const values = [...BlueArchiveEquipment.data.values()];
            return values.find(value => BlueArchiveEquipment.normalizeName(value.name) === equipName) ?? null;
        }
        else {
            console.error("Invalid identifier type. Must be a number or a string!", {
                identifier,
                type: typeof identifier
            })
        }
    }

    static getDataByTier (identifier) {
        if (identifier instanceof BlueArchiveEquipment) {
            return identifier;
        }
        else if (typeof identifier === "string") {
            const tierTypes = {
                "t1": 1,
                "t2": 2,
                "t3": 3,
                "t4": 4,
                "t5": 5
            }

            const [tier, name] = identifier.split(" ");
            const values = [...BlueArchiveEquipment.data.values()];
            if (tierTypes[tier] === 1) {
                return values.find(value => value.tier === tierTypes[tier] && BlueArchiveEquipment.normalizeName(value.category) === BlueArchiveEquipment.normalizeName(name)) ?? null;
            }
            else if (tierTypes[tier] > 1) {
                const tierData = values.find(value => value.tier === tierTypes[tier] && BlueArchiveEquipment.normalizeName(value.category) === BlueArchiveEquipment.normalizeName(name));
                if (!tierData) {
                    return null;
                }
                
                const recipeID = Number("10" + tierData.ID);
                return values.find(value => value.ID === recipeID);
            }
            else {
                return null;
            }
        }
        else {
            console.error("Invalid identifier type. Must be a number or a string!", {
                identifier,
                type: typeof identifier
            })
        }
    }

    static async loadData () {
        const data = await ba.Query.get("EquipmentData");
        for (const item of data) {
            const itemSet = new BlueArchiveEquipment({
                ID: item.Id,
                name: ba.Utils.wrapString(await ba.Utils.getEquipmentName(item.LocalizeEtcId)),
                description: ba.Utils.wrapString(await ba.Utils.getEquipmentDescription(item.LocalizeEtcId)),
                category: item.EquipmentCategory,
                rarity: item.Rarity,
                maxLevel: item.MaxLevel,
                recipeID: item.RecipeId,
                tier: item.TierInit,
                tags: item.Tags
            });

            BlueArchiveEquipment.data.set(item.Id, itemSet);

            // console.log(`${chalk.green("[Loader]")} || ${chalk.red("Loaded equipment:")} ${chalk.yellow(item.Id)} || ${chalk.red("Type:")} ${chalk.blue(item.EquipmentCategory)} || ${chalk.red("Tier:")} ${chalk.magenta(item.TierInit)}`);
        }

        console.log(`${chalk.green("[Loader]")} || ${chalk.red("Loaded")} ${chalk.yellow(BlueArchiveEquipment.data.size)} ${chalk.red("equipment items")}`);
    }

    static destroy () {
        BlueArchiveEquipment.data.clear();
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
};