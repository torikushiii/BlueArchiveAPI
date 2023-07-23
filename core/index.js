module.exports = (async function (options = {}) {
	globalThis.ba = {};

	const files = [
		"singleton/logger",

		"singleton/query",
		"singleton/utils",

		"classes/character",
		"classes/skill"
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
					const Component = require("./singletons/query");
					ba.Query = Component.singleton().client;
					break;
				}

				case "utils": {
					const Component = require("./singletons/utils");
					ba.Utils = Component.singleton();
					break;
				}

				case "logger": {
					const Component = require("./singletons/logger");
					ba.Logger = Component.singleton();
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
