const chalk = require("chalk");

module.exports = class BlueArchiveDrop extends require("./template") {
    static data = new Map();
    constructor (data) {
        super();

        /**
         * Name of the stage that the equipment drop.
         * @type {string}
         */
        this.stageName = data.stageName;

        /**
         * Uniqe identifier of the stage group ID.
         * @type {object}
         */
        this.stageInfo = data.stageInfo ?? {};

        /**
         * The equipment ID on that stage.
         * @type {number}
         */
        this.stageRewardID = data.stageRewardID;

        /**
         * Amount of total equipment drop on the stage
         * @type {number}
         */
        this.dropAmount = data.dropAmount;

        /**
         * The equipment drop chance.
         * @type {number}
         */
        this.dropChance = data.dropChance;
    }

    static get (identifier) {
        if (identifier instanceof BlueArchiveDrop) {
            return identifier;
        }
        else if (typeof identifier === "number") {
            const values = [...BlueArchiveDrop.data.values()];
            const filtered = values.filter(value => value.stageRewardID === identifier);
            return filtered.length ? filtered : null;
        }
        else {
            console.error("Invalid identifier type. Must be a number!", {
                identifier,
                type: typeof identifier
            })
        }
    }

    static async loadData () {
        const data = require("../../assets/data/DropData.json");
        for (let i = 0; i < data.DataList.length; i++) {
            if (data.DataList[i].RewardTag === "Default") {
                const getStageName = ba.BlueArchiveStage.getStageByID(data.DataList[i].GroupId);
                const dropObj = new BlueArchiveDrop({
                    stageName: (getStageName) ? `[${getStageName.difficulty}] ${getStageName.type} ${getStageName.chapter}-${getStageName.subChapter}` : "???",
                    stageInfo: {
                        ID: data.DataList[i].GroupId,
                        stageData: `http${ba.Config.secure ? "s" : ""}://${ba.Config.hostname}/stage/${data.DataList[i].GroupId}`
                    },
                    stageRewardID: data.DataList[i].StageRewardId,
                    dropAmount: data.DataList[i].StageRewardAmount,
                    dropChance: data.DataList[i].StageRewardProb / 100
                });
    
                BlueArchiveDrop.data.set(i, dropObj);
            }
        }

        console.log(`${chalk.green("[Loader]")} || ${chalk.red("Loaded")} ${chalk.yellow(BlueArchiveDrop.data.size)} ${chalk.red("drop data")}`);
    }

    static destroy () {
        BlueArchiveDrop.data.clear();
    }
}