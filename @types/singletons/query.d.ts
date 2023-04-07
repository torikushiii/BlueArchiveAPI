import { MongoClient } from "mongodb";
import { SingletonTemplate } from "./template";

declare type QuerySingletonConstructor = {
    singleton (): QuerySingleton;
    module: QuerySingleton | null;
};

export declare class QuerySingleton extends SingletonTemplate {
    #pool: MongoClient | null;

    constructor ();

    connect (): Promise<void>;

    initListeners (): void;

    destroy (): void;

    get client (): MongoClient;
    get modulePath (): string;
}
