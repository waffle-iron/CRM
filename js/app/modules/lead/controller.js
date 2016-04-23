"use strict";
var uuid = require("node-uuid");
var Promise = require("bluebird");
var model_1 = require("./model");
var LeadController = (function () {
    function LeadController() {
    }
    LeadController.createNewLead = function (lead) {
        return new Promise(function (resolve, reject) {
            new model_1.LeadModel()
                .save({
                firstname: lead.firstname,
                lastname: lead.lastname,
                email: lead.email,
                phone: lead.phone,
                reason: lead.reason,
                zipcode: lead.zipcode,
                message: lead.message,
                lead_id: uuid.v4()
            })
                .then(function (lead) {
                lead.timestamp();
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
        return new Promise(function (resolve, reject) {
            new model_1.LeadModel({
                "lead_id": leadId
            })
                .fetch()
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
//# sourceMappingURL=controller.js.map