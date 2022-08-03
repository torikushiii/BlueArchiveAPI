module.exports = class SingletonTemplate {
	/**
     * Cleans up the module.
     * All submodules must implement this method.
     * @abstract
     */
	destroy () {
		throw new Error("SingletonTemplate::destroy() is not implemented");
	}

	/**
     * Construct the singleton instance.
     * @return {Promise<void>}
     */
	static singleton () {
		throw new Error("SingletonTemplate::singleton() is not implemented");
	}

	/**
     * File name of the module.
     * All submodules must implement this method.
     */
	get modulePath () {
		throw new Error("SingletonTemplate::modulePath() is not implemented");
	}
};
