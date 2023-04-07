import { BlueArchiveTemplate } from "./template";

declare type SkillData = {
    id: number;
    skillEx: string;
    normal: string[];
    passive: string[];
    sub: string[];
};

export declare class Skill extends BlueArchiveTemplate {
    static dataGlobal: Map<symbol, Skill>;
    static dataJapan: Map<symbol, Skill>;

    id: number;
    skillEx: string;
    normal: string[];
    passive: string[];
    sub: string[];

    constructor(data: SkillData);

    static get (identifier: number | Skill, region: "global" | "japan"): Skill;
    static loadData (): Promise<void>;
    static destroy (): void;
    static normalizeName (name: string): string;
}
