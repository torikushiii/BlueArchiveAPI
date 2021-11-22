module.exports = (function () {
    "use strict";

    const Express = require("express");
    const Router = Express.Router();

    Router.get("/", (req, res) => {
        res.set("Content-Type", "application/json");
        res.status(200);
        res.send({
            status: 200,
            data: "No stage ID is given!"
        });
    });

    Router.get("/:id", (req, res) => {
        res.set("Content-Type", "application/json");
        try {
            const data = ba.BlueArchiveStage.get(Number(req.params.id));
            if (!data) {
                res.status(404);
                res.send({
                    status: 404,
                    data: `Incorrect type of ID was given. Expected number instead of ${typeof req.params.id}`
                });
            }
            else {
                res.status(200);
                res.send({
                    status: 200,
                    data
                });
            }
        }
        catch (e) {
            res.status(400);
            res.send({
                status: 400,
                error: e.message
            });
        }
    });

    return Router;
})();