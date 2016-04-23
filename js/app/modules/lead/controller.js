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
            lead.lead_id = uuid.v4();
            new model_1.LeadModel()
                .save(lead)
                .then(function (lead) {
                lead.timestamp();
                return _this.getLead(lead.get("lead_id"));
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
    LeadController.getLead = function (leadId) {
        var shadowLead = {
            lead_id: leadId
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
            lead_id: lead.lead_id
        };
        return new Promise(function (resolve, reject) {
            new model_1.LeadModel(shadowLead)
                .save(lead)
                .then(function (lead) {
                lead.timestamp();
                return _this.getLead(lead.get("lead_id"));
            })
                .then(function (lead) {
                resolve(lead);
            })
                .catch(function (err) {
                reject(err);
            });
        });
    };
    LeadController.deleteLead = function (leadId) {
        var shadowLead = {
            lead_id: leadId
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
