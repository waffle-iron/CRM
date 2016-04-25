"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var faker = require("faker");
var Main = require("../../model");
var model_1 = require("../lead/model");
var ReasonModel = (function (_super) {
    __extends(ReasonModel, _super);
    function ReasonModel() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(ReasonModel.prototype, "tableName", {
        get: function () {
            return "reasons";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ReasonModel.prototype, "leads", {
        get: function () {
            return this.hasMany(model_1.LeadModel);
        },
        enumerable: true,
        configurable: true
    });
    ReasonModel.check = function (reason) {
        var valid = _super.check.call(this, reason);
        if (valid && reason.text) {
            return true;
        }
        return false;
    };
    ReasonModel.parseIt = function (reason) {
        var main = _super.parseIt.call(this, reason);
        if (!this.check(reason)) {
            throw "Cannot parse reason";
        }
        return {
            id: main.id,
            text: reason.text,
            created_at: main.created_at,
            updated_at: main.updated_at
        };
    };
    ReasonModel.createFake = function () {
        var main = _super.createFake.call(this);
        return {
            id: main.id,
            text: faker.lorem.words(1),
            created_at: main.created_at,
            updated_at: main.updated_at
        };
    };
    return ReasonModel;
}(Main.MainModel));
exports.ReasonModel = ReasonModel;
