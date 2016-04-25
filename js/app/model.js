"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var uuid = require("node-uuid");
var faker = require("faker");
var db_1 = require("./db");
var MainModel = (function (_super) {
    __extends(MainModel, _super);
    function MainModel() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(MainModel.prototype, "idAttribute", {
        get: function () {
            return "id";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MainModel.prototype, "hasTimestamps", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    MainModel.createFake = function () {
        return {
            id: uuid.v4(),
            created_at: faker.date.recent(),
            updated_at: faker.date.recent()
        };
    };
    ;
    MainModel.parseIt = function (main) {
        if (!this.check(main)) {
            throw "Cannot parse main";
        }
        return {
            id: main.id,
            created_at: new Date(main.created_at.toString()),
            updated_at: new Date(main.updated_at.toString())
        };
    };
    MainModel.check = function (main) {
        if (main.id && main.created_at && main.updated_at) {
            return true;
        }
        return false;
    };
    ;
    return MainModel;
}(db_1.db.Model));
exports.MainModel = MainModel;
