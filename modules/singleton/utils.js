module.exports = class Utils extends require("./template") {
	#localizeEtc;
	#statData;
	#characterLocalize;
	#skillLocalize;
	#skillList;

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

	async getSkillInfo (ID) {
		if (!this.#skillLocalize) {
			this.#skillLocalize = await ba.Query.get("SkillLocalize");
		}
        
		for (const keyData in this.#skillLocalize) {
			if (this.#skillLocalize[keyData].Key === ID) {
				return {
					name: this.#skillLocalize[keyData]?.NameEn ?? null,
					description: (this.#skillLocalize[keyData]?.DescriptionEn) ? this.#skillLocalize[keyData].DescriptionEn.replace(/\[([^\]]+)\]/g, "") : null
				};
			}
		}
	}

	async getSkillData (name) {
		if (!this.#skillList) {
			this.#skillList = await ba.Query.get("SkillListTable");
		}
        
		const stuff = [];
		const skill = this.#skillList.filter(skill => skill.GroupId === name);
		if (skill.length !== 0) {
			for (const key of skill) {
				stuff.push({
					level: key.Level,
					name: (await this.getSkillInfo(key.LocalizeSkillId))?.name,
					description: (await this.getSkillInfo(key.LocalizeSkillId))?.description,
					skillCost: key?.SkillCost,
					bulletType: key?.BulletType
				});
			}
		}

		return stuff;
	}

	async getEquipmentName (ID) {
		if (!this.#localizeEtc) {
			this.#localizeEtc = await ba.Query.get("LocalizeEtc");
		}

		for (const keyData in this.#localizeEtc) {
			if (this.#localizeEtc[keyData].Key === ID) {
				return this.#localizeEtc[keyData].NameEn;
			}
		}
	}

	async getEquipmentDescription (ID) {
		if (!this.#localizeEtc) {
			this.#localizeEtc = await ba.Query.get("LocalizeEtc");
		}

		for (const keyData in this.#localizeEtc) {
			if (this.#localizeEtc[keyData].Key === ID) {
				return this.#localizeEtc[keyData].DescriptionEn;
			}
		}
	}

	async getEquipmentTypes (item) {
		const data = ba.BlueArchiveEquipment.getDataByTier(item);
		if (data) {
			return data.ID;
		}
		else {
			return null;
		}
	}

	async getCharacterName (ID) {
		if (!this.#localizeEtc) {
			this.#localizeEtc = await ba.Query.get("LocalizeEtc");
		}

		for (const keyData in this.#localizeEtc) {
			if (this.#localizeEtc[keyData].Key === ID) {
				return (this.#localizeEtc[keyData].NameEn) ? this.#localizeEtc[keyData].NameEn : "???";
			}
		}
	}

	async getCharacterTerrain (ID) {
		if (!this.#statData) {
			this.#statData = await ba.Query.get("CharacterStat");
		}

		for (const keyData in this.#statData) {
			if (this.#statData[keyData].CharacterId === ID) {
				return {
					Urban: Utils.terrainTypes.Urban[this.#statData[keyData].StreetBattleAdaptation],
					Desert: Utils.terrainTypes.Desert[this.#statData[keyData].OutdoorBattleAdaptation],
					Indoor: Utils.terrainTypes.Indoor[this.#statData[keyData].IndoorBattleAdaptation]
				};
			}
		}
	}

	async getCharacterStat (ID) {
		if (!this.#statData) {
			this.#statData = await ba.Query.get("CharacterStat");
		}

		for (const keyData in this.#statData) {
			if (this.#statData[keyData].CharacterId === ID) {
				return {
					AttackLevel1: this.#statData[keyData].AttackPower1,
					AttackLevel100: this.#statData[keyData].AttackPower100,
					MaxHPLevel1: this.#statData[keyData].MaxHP1,
					MaxHPLevel100: this.#statData[keyData].MaxHP100,
					DefenseLevel1: this.#statData[keyData].DefensePower1,
					DefenseLevel100: this.#statData[keyData].DefensePower100,
					HealPowerLevel1: this.#statData[keyData].HealPower1,
					HealPowerLevel100: this.#statData[keyData].HealPower100,
					DefensePenetrationLevel1: this.#statData[keyData].DefensePenetration1,
					DefensePenetrationLevel100: this.#statData[keyData].DefensePenetration100,
					AmmoCount: this.#statData[keyData].AmmoCount,
					AmmoCost: this.#statData[keyData].AmmoCost,
					Range: this.#statData[keyData].Range,
					MoveSpeed: this.#statData[keyData].MoveSpeed
				};
			}
		}
	}

	async getCharacterInfo (ID) {
		if (!this.#characterLocalize) {
			this.#characterLocalize = await ba.Query.get("CharacterLocalize");
		}

		for (const keyData in this.#characterLocalize) {
			if (this.#characterLocalize[keyData].CharacterId === ID) {
				return {
					ArtistName: {
						KR: this.#characterLocalize[keyData].ArtistNameKr,
						JP: this.#characterLocalize[keyData].ArtistNameJp,
						TH: this.#characterLocalize[keyData].ArtistNameTh,
						TW: this.#characterLocalize[keyData].ArtistNameTw,
						EN: this.#characterLocalize[keyData].ArtistNameEn,
						DE: this.#characterLocalize[keyData].ArtistNameDe,
						FR: this.#characterLocalize[keyData].ArtistNameFr
					},
					VoiceActor: {
						KR: this.#characterLocalize[keyData].CharacterVoiceKr,
						JP: this.#characterLocalize[keyData].CharacterVoiceJp,
						TH: this.#characterLocalize[keyData].CharacterVoiceTh,
						TW: this.#characterLocalize[keyData].CharacterVoiceTw,
						EN: this.#characterLocalize[keyData].CharacterVoiceEn,
						DE: this.#characterLocalize[keyData].CharacterVoiceDe,
						FR: this.#characterLocalize[keyData].CharacterVoiceFr
					},
					StatusMessage: {
						KR: this.#characterLocalize[keyData].StatusMessageKr,
						JP: this.#characterLocalize[keyData].StatusMessageJp,
						TH: this.#characterLocalize[keyData].StatusMessageTh,
						TW: this.#characterLocalize[keyData].StatusMessageTw,
						EN: this.#characterLocalize[keyData].StatusMessageEn,
						DE: this.#characterLocalize[keyData].StatusMessageDe,
						FR: this.#characterLocalize[keyData].StatusMessageFr
					},
					FullName: {
						KR: this.#characterLocalize[keyData].FullNameKr,
						JP: this.#characterLocalize[keyData].FullNameJp,
						TH: this.#characterLocalize[keyData].FullNameTh,
						TW: this.#characterLocalize[keyData].FullNameTw,
						EN: this.#characterLocalize[keyData].FullNameEn,
						DE: this.#characterLocalize[keyData].FullNameDe,
						FR: this.#characterLocalize[keyData].FullNameFr
					},
					SchoolYear: {
						KR: this.#characterLocalize[keyData].SchoolYearKr,
						JP: this.#characterLocalize[keyData].SchoolYearJp,
						TH: this.#characterLocalize[keyData].SchoolYearTh,
						TW: this.#characterLocalize[keyData].SchoolYearTw,
						EN: this.#characterLocalize[keyData].SchoolYearEn,
						DE: this.#characterLocalize[keyData].SchoolYearDe,
						FR: this.#characterLocalize[keyData].SchoolYearFr
					},
					CharacterAge: {
						KR: this.#characterLocalize[keyData].CharacterAgeKr,
						JP: this.#characterLocalize[keyData].CharacterAgeJp,
						TH: this.#characterLocalize[keyData].CharacterAgeTh,
						TW: this.#characterLocalize[keyData].CharacterAgeTw,
						EN: this.#characterLocalize[keyData].CharacterAgeEn,
						DE: this.#characterLocalize[keyData].CharacterAgeDe,
						FR: this.#characterLocalize[keyData].CharacterAgeFr
					},
					BirthDate: {
						KR: this.#characterLocalize[keyData].BirthdayKr,
						JP: this.#characterLocalize[keyData].BirthdayJp,
						TH: this.#characterLocalize[keyData].BirthdayTh,
						TW: this.#characterLocalize[keyData].BirthdayTw,
						EN: this.#characterLocalize[keyData].BirthdayEn,
						DE: this.#characterLocalize[keyData].BirthdayDe,
						FR: this.#characterLocalize[keyData].BirthdayFr
					},
					CharHeight: {
						KR: this.#characterLocalize[keyData].CharHeightKr,
						JP: this.#characterLocalize[keyData].CharHeightJp,
						TH: this.#characterLocalize[keyData].CharHeightTh,
						TW: this.#characterLocalize[keyData].CharHeightTw,
						EN: this.#characterLocalize[keyData].CharHeightEn,
						DE: this.#characterLocalize[keyData].CharHeightDe,
						FR: this.#characterLocalize[keyData].CharHeightFr
					},
					Hobby: {
						KR: this.#characterLocalize[keyData].HobbyKr,
						JP: this.#characterLocalize[keyData].HobbyJp,
						TH: this.#characterLocalize[keyData].HobbyTh,
						TW: this.#characterLocalize[keyData].HobbyTw,
						EN: this.#characterLocalize[keyData].HobbyEn,
						DE: this.#characterLocalize[keyData].HobbyDe,
						FR: this.#characterLocalize[keyData].HobbyFr
					},
					ProfileIntroduction: {
						KR: this.#characterLocalize[keyData].ProfileIntroductionKr,
						JP: this.#characterLocalize[keyData].ProfileIntroductionJp,
						TH: this.#characterLocalize[keyData].ProfileIntroductionTh,
						TW: this.#characterLocalize[keyData].ProfileIntroductionTw,
						EN: this.#characterLocalize[keyData].ProfileIntroductionEn,
						DE: this.#characterLocalize[keyData].ProfileIntroductionDe,
						FR: this.#characterLocalize[keyData].ProfileIntroductionFr
					},
					CharacterSSRNewLine: {
						KR: this.#characterLocalize[keyData].CharacterSSRNewKr,
						JP: this.#characterLocalize[keyData].CharacterSSRNewJp,
						TH: this.#characterLocalize[keyData].CharacterSSRNewTh,
						TW: this.#characterLocalize[keyData].CharacterSSRNewTw,
						EN: this.#characterLocalize[keyData].CharacterSSRNewEn,
						DE: this.#characterLocalize[keyData].CharacterSSRNewDe,
						FR: this.#characterLocalize[keyData].CharacterSSRNewFr
					}
				};
			}
		}
	}

	removeWhitespace (string) {
		if (typeof string !== "string") {
			return "Provided input must be a string";
		}
    
		return string.replace(/\s+/g, " ").trim();
	}

	capitalize (string) {
		return string[0]?.toUpperCase() + string?.substring(1).toLowerCase();
	}
};
