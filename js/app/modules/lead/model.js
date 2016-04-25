"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var faker = require("faker");
var Main = require("../../model");
var model_1 = require("../reason/model");
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
            return "id";
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
    Object.defineProperty(LeadModel.prototype, "reason", {
        get: function () {
            return this.belongsTo(model_1.ReasonModel);
        },
        enumerable: true,
        configurable: true
    });
    LeadModel.check = function (lead) {
        var valid = _super.check.call(this, lead);
        if (valid &&
            lead.firstname && lead.lastname &&
            lead.email && lead.reason_id) {
            return true;
        }
        return false;
    };
    LeadModel.parseIt = function (lead) {
        var main = _super.parseIt.call(this, lead);
        if (!this.check(lead)) {
            throw "Cannot parse reason";
        }
        return {
            id: main.id,
            firstname: lead.firstname,
            lastname: lead.lastname,
            email: lead.email,
            phone: lead.phone,
            reason_id: lead.reason_id,
            zipcode: lead.zipcode,
            message: lead.message,
            created_at: main.created_at,
            updated_at: main.updated_at
        };
    };
    LeadModel.createFake = function () {
        var object = _super.createFake.call(this);
        var reason = model_1.ReasonModel.createFake();
        return {
            id: object.id,
            firstname: faker.name.firstName(),
            lastname: faker.name.lastName(),
            email: faker.internet.email(),
            reason_id: reason.id,
            created_at: object.created_at,
            updated_at: object.updated_at
        };
    };
    return LeadModel;
}(Main.MainModel));
exports.LeadModel = LeadModel;
