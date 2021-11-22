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

        let id = Number(req.params.id);
        if (isNaN(id)) {
            id = req.params.id;
        }

        if (id.toString().toLowerCase().startsWith("t")) {
            id = id.toString().toLowerCase();
            const tierData = await ba.Localize.getTypes(id);
            if (tierData) {
                id = tierData;
            }
            else {
                id = null;
            }
        }

        const data = ba.BlueArchiveEquipment.get(id);
        if (data) {
            try {
                res.status(200);
                res.send({
                    status: 200,
                    data: data,
                    drop: ba.BlueArchiveDrop.get(data?.ID) ?? null
                });
            }
            catch (e) {
                res.status(400);
                res.send({
                    status: 400,
                    error: e.message
                });
            }
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