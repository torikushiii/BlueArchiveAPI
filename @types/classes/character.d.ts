import { BlueArchiveTemplate } from "./template";

export declare class Character extends BlueArchiveTemplate {
    static data: Map<number, Character>;

    id: number;
    localizeEtcId: string;
    name: string;
    released: boolean;
    playable: boolean;
    baseStar: number;
    rarity: number;
    armorType: string;
    bulletType: string;
    position: string;
    role: string;
    squadType: string;
    weaponType: string;
    club: string;
    school: string;
    imageIdentifier: string;
    equipmentType: string;
    tags: string[];
    region: string;

    constructor (data: {
        id: number,
        localizeEtcId: string,
        name: string,
        released: boolean,
        playable: boolean,
        baseStar: number,
        rarity: number,
        armorType: string,
        bulletType: string,
        position: string,
        role: string,
        squadType: string,
        weaponType: string,
        club: string,
        school: string,
        imageIdentifier: string,
        equipmentType: string,
        tags: string[],
        region: string
    });

    /**
     * Fixes the given armor type by converting it to lowercase and replacing spaces with underscores.
     * @param armorType The armor type to fix.
     * @returns The fixed armor type.
     */
    private fixArmorType (armorType: string): string;

    /**
     * Fixes the given role type by converting it to lowercase and replacing spaces with underscores.
     * @param roleType The role type to fix.
     * @returns The fixed role type.
     */
    private fixRoleType (roleType: string): string;
    
    /**
     * Returns the character data that matches the given identifier.
     * @param identifier The identifier of the character data to retrieve.
     * @returns The character data that matches the given identifier.
     */
    static get (identifier: Character | number): Character | null;

    /**
     * Loads the character data from the database.
     * @returns A promise that resolves when the character data has been loaded.
     */
    static loadData (): Promise<void>;

    /**
     * Clears the character data.
     */
    static destroy (): void;
}
