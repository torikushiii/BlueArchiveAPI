import { BlueArchiveTemplate } from "./template";

declare type ObjectiveType = {
    type: string;
    value: number;
};

declare type StageInfoType = {
    title: string;
    description: string;
};

declare type StageDataType = {
    chara: number;
    enemy: number[];
    count: number[];
    wave: number;
    boss: number;
};

declare type RaidType = {
    seasonId: number;
    bossName: string;
    startAt: Date;
    settleAt: Date;
    endAt: Date;
};

declare type StageDataTypeMain = {
    id: number;
    minRank: number;
    staminaCost: number;
    battleDuration: number;
    maxTurn: number;
    stageInfo: StageInfoType;
    objective?: ObjectiveType[];
    stageData?: StageDataType;
};

declare type StageDataMapType = Map<string, Stage>;

export declare class Stage extends BlueArchiveTemplate {
    static dataGlobal: StageDataMapType;
    static dataJapan: StageDataMapType;

    id: number;
    minRank: number;
    staminaCost: number;
    battleDuration: number;
    maxTurn: number;
    stageInfo: StageInfoType;
    objective: ObjectiveType[];
    stageData: StageDataType;

    constructor (data: StageDataTypeMain);

    static get (identifier: number | Stage, region: string): Stage | undefined;

    static getStagebyId (identifier: number | Stage): Stage | undefined;

    static raid (region: string): Promise<{ current: RaidType[]; upcoming: RaidType[]; ended: RaidType[] }>;

    static loadData (): Promise<void>;

    static destroy (): void;

    static normalizeName (name: string): string;
}
