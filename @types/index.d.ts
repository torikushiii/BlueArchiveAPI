import { Character } from "./classes/character";
import { Drops } from "./classes/drop";
import { Equipment } from "./classes/equipment";
import { Skill } from "./classes/skill";

import { QuerySingleton } from "./singletons/query";
import { Utils } from "./singletons/utils";

export declare type GlobalBaObject = {
    Character: typeof Character;
    Drops: typeof Drops;
    Equipment: typeof Equipment;
    Skill: typeof Skill;
    
    Query: InstanceType<typeof QuerySingleton>;
    Utils: InstanceType<typeof Utils>;
};

declare type ModuleFilePath = "classes/character"
    | "classes/drop"
    | "classes/equipment"
    | "classes/skill"
    | "singletons/query"
    | "singletons/utils";
    
declare type OptionsObject = {
    whitelist?: ModuleFilePath[];
    skip?: ModuleFilePath[];
};

export declare function initialize (options?: OptionsObject): Promise<GlobalBaObject>;
