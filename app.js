(async function () {
    "use strict";

    require("./db-access");
    await require("./modules")();
    const subroutes = [
        "character",
        "equipment",
        "stage",
    ];

    const port = ba.Config.port;
    const bodyParser = require("body-parser");

    const Express = require("express");
    require("express-async-errors");

    const app = Express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    // robots.txt - disallow all
    app.get("/robots.txt", (req, res) => {
        res.type("text/plain");
        res.send("User-agent: *\nDisallow: /");
    });

    app.get("/", async (req, res) => {
        res.set("Content-Type", "application/json");
        res.status(200);
        res.send({
            status: 200,
            endpoints: subroutes
        })
    });

    for (const route of subroutes) {
        app.use(`/${route}`, require(`./routes/${route}`));
    }

    app.use(async (err, req, res, next) => {
        if (err instanceof URIError) {
            res.set("Content-Type", "application/json");
            res.status(400);
            res.send({
                status: 400,
                message: "Invalid URI"
            });
        }

        console.error("API Error", { err, req, res });

        try {
            const requestID = await ba.Query.getRowID("error");
            ba.Query.set("error", {
                request: requestID,
                message: err.message ?? null,
                stack: err.stack ?? null
            });

            res.set("Content-Type", "application/json");
            return res.status(500).send({
                status: 500,
                message: `Internal Server Error (ID ${requestID})`
            });
        }
        catch (e) {
            console.error("Error while trying to log error", e);

            res.set("Content-Type", "application/json");
            return res.status(500).send({
                status: 500,
                message: "Internal Server Error"
            });
        }
    });

    app.get("*", (req, res) => {
        res.status(404);
        res.send({
            status: 404,
            message: "Endpoint Does Not Exists"
        });
    });

    app.listen(port, () => console.log(`BlueArchive API Running on ${port}`));
})();