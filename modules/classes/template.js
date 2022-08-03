module.exports = class BlueArchiveTemplate {
	static data = [];

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
