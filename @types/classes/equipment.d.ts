import { BlueArchiveTemplate } from "./template";

declare type EquipmentData = {
    id: number;
    localizeId: string;
    recipeId: number;
    category: string;
    rarity: number;
    maxLevel: number;
    tier: number;
    tags: string[];
}

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

    constructor (data: EquipmentData);

    static get (identifier: number | Equipment, region: "global" | "japan"): Equipment | null;

    static getDatabyTier (identifier: string): Promise<EquipmentData | null>;

    static loadData (): Promise<void>;

    static parseEquipmentData (data: EquipmentData): Promise<EquipmentData>;

    static destroy (): void;

    static normalizeName (name: string): string;
}