module.exports = class SingletonTemplate {
	destroy () {
		throw new Error("Module.destroy is not implemented");
	}

	static singleton () {
		throw new Error("Module.singleton is not implemented");
	}

	get modulePath () {
		throw new Error("Module.modulePath is not implemented");
	}
};
