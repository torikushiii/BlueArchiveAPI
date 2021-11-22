const chalk = require("chalk");

module.exports = (async function () {
    globalThis.ba = {};

    const files = [
        "singleton/localize",

        "classes/equipment",
        "classes/stage",
        "classes/drop"
    ];

    ba.Config = require("./config");

    console.groupCollapsed("Loading BlueArchive module");

    for (const file of files) {
        console.log(`${chalk.green("[LOADER]")} || ${chalk.red(`Loading ${file}`)}`);
        const start = process.hrtime.bigint();
        
        const [type, moduleName] = file.split("/");
        if (type === "singleton") {
            switch (moduleName) {
                case "localize": {
                    ba.Localize = require("./singleton/localize");
                    break;
                }
            }
        }
        else if (type === "classes") {
            const component = require(`./${file}`);
            ba[component.name] = await component.initialize();
        }

        const end = process.hrtime.bigint();
        console.log(`${chalk.green("[LOADER]")} || ${chalk.blue(`${moduleName} loaded in ${Number(end - start) / 1e6}ms`)}`);
    }

    console.groupEnd();
})();