"use strict";
var uuid = require("node-uuid");
var Promise = require("bluebird");
var model_1 = require("./model");
var LeadController = (function () {
    function LeadController() {
    }
    LeadController.createNewLead = function (lead) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            lead.id = uuid.v4();
            new model_1.LeadModel()
                .save(lead)
                .then(function (lead) {
                lead.timestamp();
                return _this.getLead(lead.get("id"));
            })
                .then(function (lead) {
                resolve(lead);
            })
                .catch(function (err) {
                reject(err);
            });
        });
    };
    LeadController.getAllLeads = function () {
        return new Promise(function (resolve, reject) {
            new model_1.LeadModel()
                .fetchAll()
                .then(function (leads) {
                resolve(leads);
            })
                .catch(function (err) {
                reject(err);
            });
        });
    };
    LeadController.getLead = function (id) {
        var shadowLead = {
            id: id
        };
        return new Promise(function (resolve, reject) {
            new model_1.LeadModel(shadowLead)
                .fetch({
                require: true
            })
                .then(function (lead) {
                resolve(lead);
            })
                .catch(function (err) {
                reject(err);
            });
        });
    };
    LeadController.updateLead = function (lead) {
        var _this = this;
        var shadowLead = {
            id: lead.id
        };
        return new Promise(function (resolve, reject) {
            new model_1.LeadModel(shadowLead)
                .save(lead)
                .then(function (lead) {
                lead.timestamp();
                return _this.getLead(lead.get("id"));
            })
                .then(function (lead) {
                resolve(lead);
            })
                .catch(function (err) {
                reject(err);
            });
        });
    };
    LeadController.deleteLead = function (id) {
        var shadowLead = {
            id: id
        };
        return new Promise(function (resolve, reject) {
            new model_1.LeadModel(shadowLead)
                .destroy()
                .then(function (lead) {
                resolve(lead);
            })
                .catch(function (err) {
                reject(err);
            });
        });
    };
    return LeadController;
}());
exports.LeadController = LeadController;
