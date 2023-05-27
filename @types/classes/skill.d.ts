import { BlueArchiveTemplate } from "./template";

export declare class Skill extends BlueArchiveTemplate {
    static dataGlobal: Map<symbol, Skill>;
    static dataJapan: Map<symbol, Skill>;

    id: number;
    skillEx: string;
    normal: string;
    passive: string;
    sub: string;

    constructor (data: {
        id: number,
        skillEx: string,
        normal: string,
        passive: string,
        sub: string
    });

    /**
     * Returns the skill data that matches the identifier and region.
     * @param identifier The identifier of the skill data to retrieve.
     * @param region The region to retrieve the skill data from.
     * @returns The skill data that matches the identifier and region.
     */
    static get (identifier: Skill | number, region: "global" | "japan"): Skill | null;

    /**
     * Loads the skill data from the database for both the global and Japan regions.
     * @returns A promise that resolves when the skill data has been loaded.
     */
    static loadData (): Promise<void>;

    /**
     * Clears the skill data.
     */
    static destroy (): void;

    /**
     * Normalizes the given name by converting it to lowercase.
     * @param name The name to normalize.
     * @returns The normalized name.
     */
    static normalizeName (name: string): string;
}