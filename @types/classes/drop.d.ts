import { BlueArchiveTemplate } from "./template";

export declare class Drops extends BlueArchiveTemplate {
    static dataGlobal: Map<any, any>;
    static dataJapan: Map<any, any>;

    id: number;
    tag: string;
    stageRewardId: number;
    dropAmount: number;
    dropChance: number;

    constructor (data: any);

    static get (identifier: Drops | number, region: "global" | "japan"): Drops[] | Drops;

    static getDropbyStage (identifier: Drops | number): Drops[] | Drops;

    static loadData (): Promise<void>;

    static destroy (): void;
}
