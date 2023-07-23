module.exports = class UtilsSingleton extends require("./template.js") {
	static terrainTypes = {
		Urban: {
			SS: {
				DamageDealt: "130%(1.3x)",
				ShieldBlockRate: "75%"
			},
			S: {
				DamageDealt: "120%(1.2x)",
				ShieldBlockRate: "60%"
			},
			A: {
				DamageDealt: "110%(1.1x)",
				ShieldBlockRate: "45%"
			},
			B: {
				DamageDealt: "100%(1x)",
				ShieldBlockRate: "30%"
			},
			C: {
				DamageDealt: "90%(0.9x)",
				ShieldBlockRate: "15%"
			},
			D: {
				DamageDealt: "80%(0.8x)",
				ShieldBlockRate: "0%"
			}
		},
		Desert: {
			SS: {
				DamageDealt: "130%(1.3x)",
				ShieldBlockRate: "75%"
			},
			S: {
				DamageDealt: "120%(1.2x)",
				ShieldBlockRate: "60%"
			},
			A: {
				DamageDealt: "110%(1.1x)",
				ShieldBlockRate: "45%"
			},
			B: {
				DamageDealt: "100%(1x)",
				ShieldBlockRate: "30%"
			},
			C: {
				DamageDealt: "90%(0.9x)",
				ShieldBlockRate: "15%"
			},
			D: {
				DamageDealt: "80%(0.8x)",
				ShieldBlockRate: "0%"
			}
		},
		Indoor: {
			SS: {
				DamageDealt: "130%(1.3x)",
				ShieldBlockRate: "75%"
			},
			S: {
				DamageDealt: "120%(1.2x)",
				ShieldBlockRate: "60%"
			},
			A: {
				DamageDealt: "110%(1.1x)",
				ShieldBlockRate: "45%"
			},
			B: {
				DamageDealt: "100%(1x)",
				ShieldBlockRate: "30%"
			},
			C: {
				DamageDealt: "90%(0.9x)",
				ShieldBlockRate: "15%"
			},
			D: {
				DamageDealt: "80%(0.8x)",
				ShieldBlockRate: "0%"
			}
		}
	};

	static data = new Map();

	/**
	 * @inheritdoc
	 */
	static singleton () {
		if (!UtilsSingleton.module) {
			UtilsSingleton.module = new UtilsSingleton();
		}

		return UtilsSingleton.module;
	}

	async getCharacterName (identifier, region) {
		if (!UtilsSingleton.data.has(`${region}.LocalizeEtc`)) {
			const characterNames = await ba.Query.collection(`${region}.LocalizeEtc`).find({}).toArray();
			if (!characterNames) {
				throw new Error(`No character names found for ${region}`);
			}

			UtilsSingleton.data.set(`${region}.LocalizeEtc`, characterNames);
		}

		const characterMap = UtilsSingleton.data.get(`${region}.LocalizeEtc`);
		const characterData = characterMap.find(i => i.key === identifier);
		if (!characterData) {
			return null;
		}

		return characterData;
	}

	async getCharacterData (character, region) {
		if (!UtilsSingleton.data.has(`${region}.CharacterLocalize`)) {
			const characterLocalize = await ba.Query.collection(`${region}.CharacterLocalize`).find({}).toArray();
			if (!characterLocalize) {
				throw new Error(`No character localize data found for ${region}`);
			}

			UtilsSingleton.data.set(`${region}.CharacterLocalize`, characterLocalize);
		}

		if (!UtilsSingleton.data.has(`${region}.CharacterStat`)) {
			const characterStat = await ba.Query.collection(`${region}.CharacterStat`).find({}).toArray();
			if (!characterStat) {
				throw new Error(`No character stat data found for ${region}`);
			}

			UtilsSingleton.data.set(`${region}.CharacterStat`, characterStat);
		}

		const info = UtilsSingleton.data.get(`${region}.CharacterLocalize`).find(i => i.id === character.id);
		const statData = UtilsSingleton.data.get(`${region}.CharacterStat`).find(i => i.id === character.id);
		if (!info || !statData) {
			return null;
		}

		const charName = await this.getCharacterName(character.localizeEtcId, region);
		if (!charName) {
			return null;
		}

		return {
			info,
			name: charName.name,
			stat: statData,
			topology: {
				urban: UtilsSingleton.terrainTypes.Urban[statData.streetMood],
				outdoor: UtilsSingleton.terrainTypes.Desert[statData.outdoorMood],
				indoor: UtilsSingleton.terrainTypes.Indoor[statData.indoorMood]
			}
		};
	}

	async getSkillInfo (identifier, region) {
		if (!UtilsSingleton.data.has(`${region}.SkillLocalize`)) {
			const skillLocalize = await ba.Query.collection(`${region}.SkillLocalize`).find({}).toArray();
			if (!skillLocalize) {
				throw new Error(`No skill localize data found for ${region}`);
			}

			UtilsSingleton.data.set(`${region}.SkillLocalize`, skillLocalize);
		}

		const skillLocalize = UtilsSingleton.data.get(`${region}.SkillLocalize`);
		const skillData = skillLocalize.find(i => i.id === identifier);
		if (!skillData) {
			return null;
		}

		return {
			id: skillData.id,
			name: skillData.name,
			description: skillData.description
		};
	}

	async getSkillData (identifier, region) {
		if (!UtilsSingleton.data.has(`${region}.SkillListTable`)) {
			const skillListTable = await ba.Query.collection(`${region}.SkillListTable`).find({}).toArray();
			if (!skillListTable) {
				throw new Error(`No skill list table data found for ${region}`);
			}

			UtilsSingleton.data.set(`${region}.SkillListTable`, skillListTable);
		}

		const stuff = [];
		const skillListTable = UtilsSingleton.data.get(`${region}.SkillListTable`);
		const skillData = skillListTable.filter(i => i.groupId === identifier);
		if (skillData.length !== 0) {
			for (const skill of skillData) {
				const skillInfo = await this.getSkillInfo(skill.localizeSkillId, region);
				if (skillInfo) {
					stuff.push(skillInfo);
				}
			}
		}

		return stuff;
	}

	async getBannerData (region) {
		if (!UtilsSingleton.data.has(`${region}.GachaData`)) {
			const bannerData = await ba.Query.collection(`${region}.GachaData`).find({}).toArray();
			if (!bannerData) {
				throw new Error(`No banner data found for ${region}`);
			}

			UtilsSingleton.data.set(`${region}.GachaData`, bannerData);
		}

		const current = [];
		const upcoming = [];
		const ended = [];

		const bannerData = UtilsSingleton.data.get(`${region}.GachaData`);
		for (const banner of bannerData) {
			const now = Date.now();
			const start = banner.startAt;
			const end = banner.endAt;

			const bannerInfo = await this.parseBannerData(banner, region);

			if (now >= start && now <= end) {
				current.push(bannerInfo);
			}
			else if (now < start) {
				upcoming.push(bannerInfo);
			}
			else if (now > end) {
				ended.push(bannerInfo);
			}
		}

		return {
			current,
			upcoming,
			ended
		};
	}

	async parseBannerData (data, region) {
		const rateups = [];
		for (const rateup of data.rateup) {
			const charData = await ba.Character.get(rateup, { region });
			if (!charData) {
				ba.Logger.error(`Character rate-up ${rateup} not found`);
				continue;
			}

			const characterData = await this.getCharacterName(charData.localizeEtcId, region);
			if (!characterData) {
				ba.Logger.error(`Character name rate-up ${rateup} not found`);
				continue;
			}
			
			rateups.push(characterData.name);
		}

		return {
			gachaType: data.type,
			startAt: data.startAt,
			endAt: data.endAt,
			rateups
		};
	}
};
