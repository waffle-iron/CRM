"use strict";
var router_1 = require("./router");
var Reason = (function () {
    function Reason() {
        this.reasonRouter = new router_1.ReasonRouter();
        this.reasonRouter.setUpRoutes();
    }
    Object.defineProperty(Reason.prototype, "Router", {
        get: function () {
            return this.reasonRouter.Router;
        },
        enumerable: true,
        configurable: true
    });
    return Reason;
}());
exports.Reason = Reason;
