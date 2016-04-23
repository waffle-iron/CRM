"use strict";
var express = require("express");
var Server = (function () {
    function Server(port) {
        this.port = port;
        this.app = express();
        var router = express.Router();
        router.get("/", function (req, res) {
            res.status(200).send("CRM API");
        });
        this.setApiRouter("", router);
    }
    Server.prototype.start = function () {
        this.server = this.app.listen(this.port);
    };
    Server.prototype.stop = function () {
        this.server.close();
    };
    Server.prototype.setMiddlewares = function () {
        var _this = this;
        var handlers = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            handlers[_i - 0] = arguments[_i];
        }
        handlers.forEach(function (handler) {
            _this.app.use(handler);
        });
    };
    Server.prototype.setRouter = function (address, router) {
        this.app.use(address, router);
    };
    Server.prototype.setApiRouter = function (address, router) {
        this.setRouter("/api" + address, router);
    };
    Object.defineProperty(Server.prototype, "App", {
        get: function () {
            return this.app;
        },
        enumerable: true,
        configurable: true
    });
    return Server;
}());
exports.Server = Server;
//# sourceMappingURL=server.js.map