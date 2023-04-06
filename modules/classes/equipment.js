const chalk = require("chalk");

module.exports = class Equipment extends require("./template") {
	static dataGlobal = new Map();
	static dataJapan = new Map();

	constructor (data) {
		super();

		this.id = data.id;

		this.localizeId = data.localizeId;

		this.recipeId = data.recipeId;

		this.category = data.category;

		this.rarity = data.rarity;

		this.maxLevel = data.maxLevel;

		this.tier = data.tier;

		this.tags = data.tags;
	}

	static get (identifier, region) {
		if (identifier instanceof Equipment) {
			return identifier;
		}
		else if (typeof identifier === "number") {
			const data = region === "global" ? Equipment.dataGlobal : Equipment.dataJapan;
			const values = [...data.values()];
			const equipmentData = values.filter(i => i.id === identifier);
			if (equipmentData.length === 0) {
				return null;
			}
			
			return equipmentData[0];
		}
		else {
			console.error(chalk `{red Invalid identifier for Equipment.get(). Expected number!}`, {
				identifier,
				type: typeof identifier
			});
		}
	}

	static getDatabyTier (identifier) {
		if (identifier instanceof Equipment) {
			return identifier;
		}
		else if (typeof identifier === "string") {
			const tierTypes = {
				t1: 1,
				t2: 2,
				t3: 3,
				t4: 4,
				t5: 5,
				t6: 6,
				t7: 7,
				t8: 8,
				t9: 9
			};

			const [tier, name] = identifier.split(" ");
			const values = [...Equipment.data.values()];
			if (tierTypes[tier] === 1) {
				return this.parseEquipmentData(values.find(i => i.tier === tierTypes[tier]
					&& Equipment.normalizeName(i.category) === Equipment.normalizeName(name))
				);
			}
			else {
				const tierData = values.find(i => i.tier === tierTypes[tier]
					&& Equipment.normalizeName(i.category) === Equipment.normalizeName(name)
				);

				if (typeof tierData === "undefined") {
					return null;
				}

				const recipeId = Number(`10${tierData.id}`);
				return values.find(i => i.id === recipeId);
			}
		}
		else {
			console.error(chalk `{red Invalid identifier for Equipment.get(). Expected string!}`, {
				identifier,
				type: typeof identifier
			});
		}
	}

	static async loadData () {
		const regions = ["global", "japan"];

		for (const region of regions) {
			const data = await ba.Query.collection(`${region}.EquipmentData`).find({}).toArray();
			if (data.length === 0) {
				throw new Error(`No equipment data found for region ${region}`);
			}

			for (const equipment of data) {
				const equipmentData = new Equipment(equipment);
				if (region === "global") {
					Equipment.dataGlobal.set(Symbol(equipmentData.id), equipmentData);
				}
				else if (region === "japan") {
					Equipment.dataJapan.set(Symbol(equipmentData.id), equipmentData);
				}
			}
		}
	}

	static async parseEquipmentData (data) {
		const equipData = await ba.Utils.getEquipmentData(data.id);
		return {
			id: data.id,
			name: equipData.name,
			description: equipData.description,
			category: data.category,
			rarity: data.rarity,
			maxLevel: data.maxLevel,
			recipeId: data.recipeId,
			tier: data.tier,
			tags: data.tags
		};
	}

	static destroy () {
		Equipment.data.clear();
	}

	static normalizeName (name) {
		return name.toLowerCase();
	}
};
