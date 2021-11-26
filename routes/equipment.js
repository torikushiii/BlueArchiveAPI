module.exports = (function () {
    "use strict";

    const Express = require("express");
    const Router = Express.Router();

    Router.get("/", (req, res) => {
        res.set("Content-Type", "application/json");
        res.status(200);
        res.send({
            status: 200,
            data: "No equipment ID is given!"
        });
    });

    Router.get("/:id", async (req, res) => {
        res.set("Content-Type", "application/json");

        let id;
        if (isNaN(req.params.id)) {
            id = (req.params.id).toLowerCase();

            const regex = /^t[1-4] (.*)$/;
            const match = id.match(regex);
            if (match) {
                const tierData = await ba.Localize.getTypes(id);
                if (tierData) {
                    id = tierData;
                }
                else {
                    id= null;
                }
            }
        }
        else {
            id = Number(req.params.id);
        }

        const cache = await ba.Cache.get(id);
        if (cache) {
            res.status(200);
            return res.send(cache);
        }

        const data = ba.BlueArchiveEquipment.get(id);
        if (data) {
            res.status(200);
            res.send({
                status: 200,
                data: data,
                drop: ba.BlueArchiveDrop.get(data?.ID) ?? null
            });

            return await ba.Cache.set({
                "key": id,
                "value": JSON.stringify({
                    data: data,
                    drop: ba.BlueArchiveDrop.get(data?.ID) ?? null
                }),
                "expireAt": 1_800_000
            });
        }
        else {
            res.status(404);
            res.send({
                status: 404,
                data: "No equipment exists with this ID / Name",
                drop: null
            });
        }
    });

    return Router;
})();