"use strict";
var jwt = require("express-jwt");
var express = require("express");
var jwtCheck = jwt({
    secret: new Buffer(process.env.JWT_SECRET, 'base64'),
    audience: process.env.JWT_AUDIENCE,
    credentialsRequired: false
});
var controller_1 = require("./controller");
var LeadRouter = (function () {
    function LeadRouter() {
        this.router = express.Router();
    }
    LeadRouter.prototype.setUpRoutes = function () {
        this.setUpGetRoute();
        this.setUpGetAllRoute();
        this.setUpPostRoute();
        this.setUpPutRoute();
        this.setUpDeleteRoute();
        this.setUpPatchRoute();
    };
    LeadRouter.prototype.setUpGetAllRoute = function () {
        this.router.get("/", jwtCheck, function (req, res) {
            controller_1.LeadController
                .getAllLeads()
                .then(function (leads) {
                res.status(200).json(leads);
            })
                .catch(function (err) {
                res.status(500).json(err);
            });
        });
    };
    LeadRouter.prototype.setUpPostRoute = function () {
        this.router.post("/", function (req, res) {
            controller_1.LeadController
                .createNewLead(req.body)
                .then(function (lead) {
                res.status(201).json(lead);
            })
                .catch(function (err) {
                res.status(500).json(err);
            });
        });
    };
    LeadRouter.prototype.setUpGetRoute = function () {
        this.router.get("/:id", function (req, res) {
            var id = req.params.id;
            controller_1.LeadController
                .getLead(id)
                .then(function (lead) {
                res.status(200).json(lead);
            })
                .catch(function (err) {
                res.status(404).json(err);
            });
        });
    };
    LeadRouter.prototype.setUpPutRoute = function () {
        this.router.put("/:id", function (req, res) {
            var lead = req.body;
            lead.id = req.params.id;
            controller_1.LeadController
                .updateLead(lead)
                .then(function (lead) {
                res.status(200).json(lead);
            })
                .catch(function (err) {
                res.status(500).json(err);
            });
        });
    };
    LeadRouter.prototype.setUpPatchRoute = function () {
        this.router.patch("/:id", function (req, res) {
            var lead = req.body;
            lead.id = req.params.id;
            controller_1.LeadController
                .updateLead(lead)
                .then(function (lead) {
                res.status(200).json(lead);
            })
                .catch(function (err) {
                res.status(500).json(err);
            });
        });
    };
    LeadRouter.prototype.setUpDeleteRoute = function () {
        this.router.delete("/:id", function (req, res) {
            var id = req.params.id;
            controller_1.LeadController
                .deleteLead(id)
                .then(function (lead) {
                res.status(200).json(lead);
            })
                .catch(function (err) {
                res.status(500).json(err);
            });
        });
    };
    Object.defineProperty(LeadRouter.prototype, "Router", {
        get: function () {
            return this.router;
        },
        enumerable: true,
        configurable: true
    });
    return LeadRouter;
}());
exports.LeadRouter = LeadRouter;
