module.exports = (async function (options = {}) {
	/**
     * Global namespace
     * @namespace
     * @type {Object}
     */
	globalThis.ba = {};

	const files = [
		"singleton/query",
		"singleton/utils",

		"classes/character",
		"classes/drop",
		"classes/equipment",
		"classes/skill",
		"classes/stage"
	];

	const {
		whitelist,
		skip = []
	} = options;

	ba.Config = require("./config");

	console.groupCollapsed("Loading BlueArchive module");

	for (const file of files) {
		if (whitelist && !whitelist.includes(file)) {
			continue;
		}

		console.log(`[LOADER] || Loading ${file}`);
		const start = process.hrtime.bigint();
        
		const [type, moduleName] = file.split("/");
		if (type === "singleton") {
			switch (moduleName) {
				case "query": {
					const Component = require("./singleton/query");
					ba.Query = Component.singleton().client;
					await new Promise(resolve => setTimeout(resolve, 500));
					break;
				}

				case "cache": {
					const Component = require("./singleton/cache");
					ba.Cache = Component.singleton();
					break;
				}

				case "utils": {
					const Component = require("./singleton/utils");
					ba.Utils = Component.singleton();
					break;
				}
			}
		}
		else if (type === "classes") {
			const component = require(`./${file}`);
			if (skip.includes(file)) {
				ba[component.name] = component;
			}
			else {
				ba[component.name] = await component.initialize();
			}
		}

		const end = process.hrtime.bigint();
		console.log(`[LOADER] || ${moduleName} loaded in ${Number(end - start) / 1e6}ms`);
	}

	console.groupEnd();

	return globalThis.ba;
});
