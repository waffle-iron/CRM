"use strict";
var uuid = require("node-uuid");
var Promise = require("bluebird");
var model_1 = require("./model");
var ReasonController = (function () {
    function ReasonController() {
    }
    ReasonController.createNewReason = function (reason) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            reason.id = uuid.v4();
            new model_1.ReasonModel()
                .save(reason)
                .then(function (reason) {
                reason.timestamp();
                return _this.getReason(reason.get("id"));
            })
                .then(function (reason) {
                resolve(reason);
            })
                .catch(function (err) {
                reject(err);
            });
        });
    };
    ReasonController.getAllReasons = function () {
        return new Promise(function (resolve, reject) {
            new model_1.ReasonModel()
                .fetchAll()
                .then(function (reasons) {
                resolve(reasons);
            })
                .catch(function (err) {
                reject(err);
            });
        });
    };
    ReasonController.getReason = function (id) {
        var shadowReason = {
            id: id
        };
        return new Promise(function (resolve, reject) {
            new model_1.ReasonModel(shadowReason)
                .fetch({
                require: true
            })
                .then(function (reason) {
                resolve(reason);
            })
                .catch(function (err) {
                reject(err);
            });
        });
    };
    ReasonController.updateReason = function (reason) {
        var _this = this;
        var shadowReason = {
            id: reason.id
        };
        return new Promise(function (resolve, reject) {
            new model_1.ReasonModel(shadowReason)
                .save(reason)
                .then(function (reason) {
                reason.timestamp();
                return _this.getReason(reason.get("id"));
            })
                .then(function (reason) {
                resolve(reason);
            })
                .catch(function (err) {
                reject(err);
            });
        });
    };
    ReasonController.deleteReason = function (id) {
        var shadowReason = {
            id: id
        };
        return new Promise(function (resolve, reject) {
            new model_1.ReasonModel(shadowReason)
                .destroy()
                .then(function (reason) {
                resolve(reason);
            })
                .catch(function (err) {
                reject(err);
            });
        });
    };
    return ReasonController;
}());
exports.ReasonController = ReasonController;
