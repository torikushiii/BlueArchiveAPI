module.exports = (function () {
    "use strict";

    const Express = require("express");
    const Router = Express.Router();

    Router.get("/", (req, res) => {
        res.set("Content-Type", "application/json");
        res.status(200);
        res.send({
            status: 200,
            data: "No character ID/name is given!"
        });
    });

    Router.get("/:id", async (req, res) => {
        res.set("Content-Type", "application/json");

        const cache = await ba.Cache.get((Number(req.params.id) ? Number(req.params.id) : ba.Utils.capitalize(req.params.id)));
        if (cache) {
            res.status(200);
            return res.send({
                status: 200,
                data: cache.data,
            });
        }

        const data = ba.BlueArchiveCharacter.get((Number(req.params.id)) ? Number(req.params.id) : req.params.id);
        if (data) {
            res.status(200);
            res.send({
                status: 200,
                data
            });
        }
        else {
            res.status(404);
            res.send({
                status: 404,
                data: "Character not found!"
            });
        }
    });

    return Router;
})();