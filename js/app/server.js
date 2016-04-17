"use strict";
var express = require("express");
var Server = (function () {
    function Server(port) {
        this.port = port;
        this.app = express();
        var router = express.Router();
        router.get("/", function (req, res) {
            res.status(200).send("Hello Vyrent!");
        });
        this.setApiRouter(router);
    }
    Server.prototype.start = function () {
        this.server = this.app.listen(this.port, function () {
        });
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
    Server.prototype.setApiRouter = function () {
        var _this = this;
        var routers = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            routers[_i - 0] = arguments[_i];
        }
        routers.forEach(function (router) {
            _this.setRouter("/api", router);
        });
    };
    return Server;
}());
exports.Server = Server;
//# sourceMappingURL=server.js.map