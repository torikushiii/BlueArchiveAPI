module.exports = class BlueArchiveTemplate {
	static data = new Map();
	static dataGlobal = new Map();
	static dataJapan = new Map();

	static async initialize () {
		await this.loadData();
		return this;
	}

	static async loadData () {
		throw new Error("loadData must be implemented");
	}

	/**
     * Cleans up module
     * @abstract
     */
	destroy () {
		this.data = null;
	}
};
