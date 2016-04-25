"use strict";
var express = require("express");
var controller_1 = require("./controller");
var ReasonRouter = (function () {
    function ReasonRouter() {
        this.router = express.Router();
    }
    ReasonRouter.prototype.setUpRoutes = function () {
        this.setUpGetRoute();
        this.setUpGetAllRoute();
        this.setUpPostRoute();
        this.setUpPutRoute();
        this.setUpDeleteRoute();
        this.setUpPatchRoute();
    };
    ReasonRouter.prototype.setUpGetAllRoute = function () {
        this.router.get("/", function (req, res) {
            controller_1.ReasonController
                .getAllReasons()
                .then(function (reasons) {
                res.status(200).json(reasons);
            })
                .catch(function (err) {
                res.status(500).json(err);
            });
        });
    };
    ReasonRouter.prototype.setUpPostRoute = function () {
        this.router.post("/", function (req, res) {
            controller_1.ReasonController
                .createNewReason(req.body)
                .then(function (reason) {
                res.status(201).json(reason);
            })
                .catch(function (err) {
                res.status(500).json(err);
            });
        });
    };
    ReasonRouter.prototype.setUpGetRoute = function () {
        this.router.get("/:id", function (req, res) {
            var id = req.params.id;
            controller_1.ReasonController
                .getReason(id)
                .then(function (reason) {
                res.status(200).json(reason);
            })
                .catch(function (err) {
                res.status(404).json(err);
            });
        });
    };
    ReasonRouter.prototype.setUpPutRoute = function () {
        this.router.put("/:id", function (req, res) {
            var reason = req.body;
            reason.id = req.params.id;
            controller_1.ReasonController
                .updateReason(reason)
                .then(function (reason) {
                res.status(200).json(reason);
            })
                .catch(function (err) {
                res.status(500).json(err);
            });
        });
    };
    ReasonRouter.prototype.setUpPatchRoute = function () {
        this.router.patch("/:id", function (req, res) {
            var reason = req.body;
            reason.id = req.params.id;
            controller_1.ReasonController
                .updateReason(reason)
                .then(function (reason) {
                res.status(200).json(reason);
            })
                .catch(function (err) {
                res.status(500).json(err);
            });
        });
    };
    ReasonRouter.prototype.setUpDeleteRoute = function () {
        this.router.delete("/:id", function (req, res) {
            var id = req.params.id;
            controller_1.ReasonController
                .deleteReason(id)
                .then(function (reason) {
                res.status(200).json(reason);
            })
                .catch(function (err) {
                res.status(500).json(err);
            });
        });
    };
    Object.defineProperty(ReasonRouter.prototype, "Router", {
        get: function () {
            return this.router;
        },
        enumerable: true,
        configurable: true
    });
    return ReasonRouter;
}());
exports.ReasonRouter = ReasonRouter;
