import { BlueArchiveTemplate } from "./template";

export declare class Equipment extends BlueArchiveTemplate {
    static dataGlobal: Map<symbol, Equipment>;
    static dataJapan: Map<symbol, Equipment>;

    id: number;
    localizeId: string;
    recipeId: number;
    category: string;
    rarity: number;
    maxLevel: number;
    tier: number;
    tags: string[];

    constructor (data: {
        id: number,
        localizeId: string,
        recipeId: number,
        category: string,
        rarity: number,
        maxLevel: number,
        tier: number,
        tags: string[]
    });

    /**
     * Returns the equipment data that matches the identifier and region.
     * @param identifier The identifier of the equipment data to retrieve.
     * @param region The region to retrieve the equipment data from.
     * @returns The equipment data that matches the identifier and region.
     */
    static get (identifier: Equipment | number, region: "global" | "japan"): Equipment | null;

    /**
     * Returns the equipment data that matches the identifier.
     * @param identifier The identifier of the equipment data to retrieve.
     * @returns The equipment data that matches the identifier.
     */
    static getDatabyTier (identifier: Equipment | number): Equipment[];

    /**
     * Loads the equipment data from the database for both the global and Japan regions.
     * @returns A promise that resolves when the equipment data has been loaded.
     */
    static loadData (): Promise<void>;

    /**
     * Clears the equipment data.
     */
    static destroy (): void;
}