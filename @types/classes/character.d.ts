import { BlueArchiveTemplate } from "./template";

declare type CharacterData = {
    id: number;
    localizeEtcId: number;
    name: string;
    released: boolean;
    playable: boolean;
    baseStar: number;
    rarity: string;
    armorType: string;
    bulletType: string;
    position: string;
    role: string;
    squadType: string;
    weaponType: string;
    club: string;
    school: string;
    equipmentType: string;
    tags: string[];
    region: string;
};

declare type CharacterGetIdentifier = Character | number | string;

declare class Character extends BlueArchiveTemplate {
    static data: Map<string, Character>;

    id: number;
    localizeEtcId: number;
    name: string;
    released: boolean;
    playable: boolean;
    baseStar: number;
    rarity: string;
    armorType: string;
    bulletType: string;
    position: string;
    role: string;
    squadType: string;
    weaponType: string;
    club: string;
    school: string;
    equipmentType: string;
    tags: string[];
    region: string;

    constructor (data: CharacterData);

    static get (identifier: CharacterGetIdentifier, region?: string): Character | null;

    static getCharacterbyQuery (identifier: { type?: string; armor?: string; damage?: string; school?: string; role?: string; position?: string; weapon?: string; }, region?: string): string[] | null;

    static getAll (region?: string): Promise<CharacterData[]>;

    static loadData (): Promise<void>;

    static destroy (): void;

    fixArmorType (armorType: string): string;

    fixRoleType (roleType: string): string;

    static parseCharacterData (data: CharacterData, options?: { allChars?: boolean; region?: string; }): Promise<CharacterData | null>;
}
