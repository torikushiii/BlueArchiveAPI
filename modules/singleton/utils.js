module.exports = class Utils extends require("./template") {
	#localizeEtc;
	#statData;
	#characterLocalize;
	#skillLocalize;
	#skillList;
	#bannerData;
	#characters = new Map();

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

	/**
	 * @inheritdoc
     * @returns {Utils}
     */
	static singleton () {
		if (!Utils.module) {
			Utils.module = new Utils();
		}

		return Utils.module;
	}

	async getEquipmentData (id) {
		if (!this.#localizeEtc) {
			this.#localizeEtc = await ba.Query.collection("LocalizeEtc").find({}).toArray();
		}

		const equipmentData = ba.Equipment.get(id);
		if (!equipmentData) {
			return null;
		}

		const equipmentLoc = this.#localizeEtc.find(i => i.key === equipmentData.localizeId);
		const equipment = {
			id: equipmentData.id,
			name: equipmentLoc.name,
			description: equipmentLoc.description
		};

		return equipment;
	}

	async getCharacterName (id) {
		if (!this.#localizeEtc) {
			this.#localizeEtc = await ba.Query.collection("LocalizeEtc").find({}).toArray();
		}

		return this.#localizeEtc.find(i => i.key === id);
	}

	async getCharacterData (id) {
		if (!this.#characterLocalize) {
			this.#characterLocalize = await ba.Query.collection("CharacterLocalize").find({}).toArray();
		}
		
		if (!this.#statData) {
			this.#statData = await ba.Query.collection("CharacterStat").find({}).toArray();
		}

		const info = this.#characterLocalize.find(i => i.id === id);
		const statData = this.#statData.find(i => i.id === id);

		if (!info || !statData) {
			return null;
		}

		if (statData) {
			delete statData._id; // not sorry for this xd
		}

		return {
			info,
			stat: statData,
			topology: {
				urban: Utils.terrainTypes.Urban[statData.streetMood],
				outdoor: Utils.terrainTypes.Desert[statData.outdoorMood],
				indoor: Utils.terrainTypes.Indoor[statData.indoorMood]
			}
		};
	}

	async getSkillInfo (id) {
		if (!this.#skillLocalize) {
			this.#skillLocalize = await ba.Query.collection("SkillLocalize").find({}).toArray();
		}

		const skill = this.#skillLocalize.find(i => i.id === id);
		if (!skill) {
			return null;
		}

		return {
			id: skill.id,
			name: skill.name,
			description: skill.description
		};
	}

	async getSkillData (name) {
		if (!this.#skillList) {
			this.#skillList = await ba.Query.collection("SkillListTable").find({}).toArray();
		}

		const stuff = [];
		const skills = this.#skillList.filter(i => i.groupId === name);
		if (skills.length !== 0) {
			for (const skill of skills) {
				const skillInfo = await this.getSkillInfo(skill.localizeSkillId);
				if (skillInfo) {
					stuff.push({
						level: skill.level,
						name: skillInfo.name,
						description: skillInfo.description,
						skillCost: skill.skillCost,
						bulletType: skill.bulletType
					});
				}
			}
		}

		return stuff;
	}

	async getBannerData () {
		if (!this.#bannerData) {
			this.#bannerData = await ba.Query.collection("GachaData").find({}).toArray();
		}

		const current = [];
		const upcoming = [];
		const ended = [];

		for (const banner of this.#bannerData) {
			const now = Date.now();
			const startAt = banner.startAt;
			const endAt = banner.endAt;

			if (now >= startAt && now <= endAt) {
				current.push(Utils.parseBannerData(banner));
			}
			else if (now < startAt) {
				upcoming.push(Utils.parseBannerData(banner));
			}
			else if (now > endAt) {
				ended.push(Utils.parseBannerData(banner));
			}
		}

		return {
			current,
			upcoming,
			ended
		};
	}

	static parseBannerData (data) {
		const rateups = [];
		for (const rateup of data.rateup) {
			const charData = ba.Character.get(rateup);
			rateups.push(charData.name);
		}

		return {
			gachaType: data.type,
			startAt: data.startAt,
			endAt: data.endAt,
			rateups
		};
	}
};
