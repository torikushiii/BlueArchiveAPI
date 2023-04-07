export declare class BlueArchiveTemplate {
	static data: Map<any, any>;
	static dataGlobal: Map<any, any>;
	static dataJapan: Map<any, any>;

	static initialize (): Promise<typeof BlueArchiveTemplate>;
	static loadData (): Promise<void>;

	/**
	 * Cleans up module
	 * @abstract
	 */
	destroy (): void;
}
