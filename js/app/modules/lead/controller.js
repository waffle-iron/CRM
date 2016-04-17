"use strict";
var model_1 = require("./model");
var uuid = require("node-uuid");
var Promise = require("bluebird");
var LeadController = (function () {
    function LeadController() {
    }
    LeadController.createNewLead = function (firstname, lastname) {
        return new Promise(function (resolve, reject) {
            new model_1.LeadModel()
                .save({
                firstname: firstname,
                lastname: lastname,
                lead_id: uuid.v4()
            }).then(function (lead) {
                lead.timestamp();
                resolve(lead);
            }).catch(function (err) {
                reject(err);
            });
        });
    };
    return LeadController;
}());
exports.LeadController = LeadController;
//# sourceMappingURL=controller.js.map