"use strict";
var router_1 = require("./router");
var Lead = (function () {
    function Lead() {
        this.leadRouter = new router_1.LeadRouter();
        this.leadRouter.setUpRoutes();
    }
    Object.defineProperty(Lead.prototype, "Router", {
        get: function () {
            return this.leadRouter.Router;
        },
        enumerable: true,
        configurable: true
    });
    return Lead;
}());
exports.Lead = Lead;
