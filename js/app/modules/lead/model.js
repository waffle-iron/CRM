"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var db_1 = require("../../db");
var LeadModel = (function (_super) {
    __extends(LeadModel, _super);
    function LeadModel() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(LeadModel.prototype, "tableName", {
        get: function () {
            return "leads";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LeadModel.prototype, "idAttribute", {
        get: function () {
            return "lead_id";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LeadModel.prototype, "hasTimestamps", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    return LeadModel;
}(db_1.db.Model));
exports.LeadModel = LeadModel;
