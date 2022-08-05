const logger = require("../../lib/logger");

module.exports = class BlueArchiveStage extends require("./template") {
	static data = new Map();
	constructor (data) {
		super();

		/**
         * Unique ID of the stage.
         * @type {number}
         */
		this.ID = data.ID;

		/**
         * Minimum rank required to clear the stage.
         * @type {number}
         */
		this.minRank = data.minRank;

		/**
         * Stamina cost to enter the stage.
         * @type {number}
         */
		this.staminaCost = data.staminaCost;

		/**
         * Duration of the battle.
         * @type {string}
         */
		this.battleDuration = data.battleDuration;

		/**
         * Maximum number of turns before the battle ends.
         * @type {number}
         */
		this.maxTurns = data.maxTurns;

		/**
         * Contains the information about the stage.
         * type: the type of stage (e.g. "Main", "Sub").
         * difficulty: the difficulty of the stage (e.g. "Normal", "Hard").
         * chapter: the chapter of the stage (e.g. "1", "2", "3").
         * subChapter: the subChapter of the stage (e.g. "1", "2", "3").
         * fullName: the full name of the stage (e.g. "CHAPTER01_Normal_Main_Stage05").
         * @type {object}
         */
		this.stageInfo = data.stageInfo ?? {};

		/**
         * Contains the objective of the stage.
         * @type {object}
         */
		this.objective = data.objective ?? {};

		/**
         * Contains the stage data.
         * @type {object}
         */
		this.stageData = data.stageData ?? {};

		/**
         * The content type of the stage.
         * @type {string}
         */
		this.contentType = data.contentType;

		/**
         * The campaign reward ID of the stage.
         * @type {number}
         */
		this.campaignRewardId = data.campaignRewardId;
	}

	static get (identifier) {
		if (identifier instanceof BlueArchiveStage) {
			return identifier;
		}
		else if (typeof identifier === "number") {
			const values = [...BlueArchiveStage.data.values()];
			return values.find(stage => stage.ID === identifier) ?? null;
		}
		else {
			console.error("Invalid identifier type. Must be a number!", {
				identifier,
				type: typeof identifier
			});
		}
	}

	static getStageByID (identifier) {
		if (identifier instanceof BlueArchiveStage) {
			return identifier;
		}
		else if (typeof identifier === "number") {
			const values = [...BlueArchiveStage.data.values()];
			const data = values.find(stage => stage.ID === identifier) ?? "No stage exists with this ID";
			return data.stageInfo;
		}
		else {
			console.error("Invalid identifier type. Must be a number!", {
				identifier,
				type: typeof identifier
			});
		}
	}

	static async getRaids () {
		const stages = [];
		
		const raidData = await ba.Query.get("RaidData");
		for (const raid of raidData) {
			stages.push({
				seasonId: raid.SeasonId,
				bossName: (raid.OpenRaidBossGroup)[0],
				startAt: new Date(raid.SeasonStartData),
				endAt: new Date(raid.SeasonEndData)
			});
		}

		return stages;
	}

	static async loadData () {
		const data = await ba.Query.get("StageDataMain");
		for (const stage of data) {
			const stageData = stage.Name.split("_");
			const stageMeta = {
				type: stageData[0],
				difficulty: stageData[1],
				chapter: stageData[2],
				subChapter: stageData[3],
				fullName: stage.Name
			};

			const stageSet = new BlueArchiveStage({
				ID: stage.Id,
				minRank: stage.RecommandLevel,
				staminaCost: stage.StageEnterCostAmount,
				battleDuration: `${stage.BattleDuration / 1000}s`,
				maxTurns: stage.MaxTurn,
				stageInfo: stageMeta,
				objective: {
					objectiveOne: "Mission Complete",
					objectiveTwo: `Acquire S rank ${stage.StarConditionTacticRankSCount} time(s).`,
					objectiveThree: `Clear stage within ${stage.StarConditionTurnCount} turn(s).`
				},
				stageData: {
					stageTophography: stage.StageTopography,
					stageEnvorioment: stage.StrategyEnvironment
				},
				contentType: stage.ContentType,
				campaignRewardId: stage.CampaignStageRewardId
			});

			BlueArchiveStage.data.set(stage.Id, stageSet);
		}

		logger.warn(`Loaded ${BlueArchiveStage.data.size} stage data`);
	}

	static destroy () {
		BlueArchiveStage.data.clear();
	}
};
