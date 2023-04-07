export declare abstract class SingletonTemplate {
    static module: SingletonTemplate;
    static singleton (): void | Promise<void>;
    
    abstract destroy (): void;
    abstract get modulePath (): string;
}
