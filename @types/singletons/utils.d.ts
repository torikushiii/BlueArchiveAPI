import { SingletonTemplate } from "./template";

declare type TerrainType = {
    SS: {
        DamageDealt: string;
        ShieldBlockRate: string;
    };
    S: {
        DamageDealt: string;
        ShieldBlockRate: string;
    };
    A: {
        DamageDealt: string;
        ShieldBlockRate: string;
    };
    B: {
        DamageDealt: string;
        ShieldBlockRate: string;
    };
    C: {
        DamageDealt: string;
        ShieldBlockRate: string;
    };
    D: {
        DamageDealt: string;
        ShieldBlockRate: string;
    };
};

declare type Equipment = {
    id: string;
    name: string;
    description: string;
};

declare type CharacterData = {
    info: any;
    stat: any;
    topology: {
        urban: TerrainType;
        outdoor: TerrainType;
        indoor: TerrainType;
    };
};

declare type SkillInfo = {
    skillDesc: string;
    effectDesc: string;
    animation: string;
};

export declare class Utils implements SingletonTemplate {
    static terrainTypes: {
        Urban: Record<string, TerrainType>;
        Desert: Record<string, TerrainType>;
        Indoor: Record<string, TerrainType>;
    };

    static singleton (): Utils;

    isValidRegion (region: "global" | "japan"): boolean;

    getEquipmentData (id: string): Promise<Equipment | null>;

    getCharacterName (id: string, region: string): Promise<any>;

    getCharacterData (id: string, region: string): Promise<CharacterData | null>;

    getSkillInfo (id: string, region: string): Promise<SkillInfo | null>;

    destroy (): void;

    get modulePath (): string;
}
