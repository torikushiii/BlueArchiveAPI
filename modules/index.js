const chalk = require("chalk");

module.exports = (async function (namespace, options = {}) {
    /**
     * Global namespace
     * @namespace
     * @type {Object}
     */
    globalThis.ba = {};

    const files = [
        "singleton/query",
        "singleton/utils",
        "singleton/cache",

        "classes/equipment",
        "classes/stage",
        "classes/drop",
        "classes/skill",
        "classes/character",
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

        console.log(`${chalk.green("[LOADER]")} || ${chalk.yellow(`Loading ${file}`)}`);
        const start = process.hrtime.bigint();
        
        const [type, moduleName] = file.split("/");
        if (type === "singleton") {
            switch (moduleName) {
                case "query": {
                    const Component = require("./singleton/query");
                    ba.Query = Component.singleton();
                    break;
                }

                case "cache": {
                    const Component = require("./singleton/cache");
                    ba.Cache = Component.singleton();
                    break;
                }

                case "utils": {
                    ba.Utils = require("./singleton/utils");
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
        console.log(`${chalk.green("[LOADER]")} || ${chalk.greenBright(`${moduleName} loaded in ${Number(end - start) / 1e6}ms`)}`);
    }

    console.groupEnd();
});