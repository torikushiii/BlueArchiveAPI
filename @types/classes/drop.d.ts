import { BlueArchiveTemplate } from "./template";

export declare class Drops extends BlueArchiveTemplate {
    static dataGlobal: Map<symbol, Drops>;
    static dataJapan: Map<symbol, Drops>;

    id: number;
    tag: string;
    stageRewardId: number;
    dropAmount: number;
    dropChance: number;

    constructor (data: {
        id: number,
        tag: string,
        stageRewardId: number,
        dropAmount: number,
        dropChance: number
    });

    /**
     * Returns the drop data that matches the identifier and region.
     * @param identifier The identifier of the drop data to retrieve.
     * @param region The region to retrieve the drop data from.
     * @returns The drop data that matches the identifier and region.
     */
    static get (identifier: Drops | number, region: "global" | "japan"): Drops[] | Drops;

    /**
     * Returns the drop data that matches the identifier.
     * @param identifier The identifier of the drop data to retrieve.
     * @returns The drop data that matches the identifier.
     */
    static getDropbyStage (identifier: Drops | number): Drops[] | Drops;

    /**
     * Loads the drop data from the database for both the global and Japan regions.
     * @returns A promise that resolves when the drop data has been loaded.
     */
    static loadData (): Promise<void>;

    /**
     * Clears the drop data.
     */
    static destroy (): void;
}