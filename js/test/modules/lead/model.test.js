"use strict";
var dotenv = require("dotenv");
var chai = require("chai");
dotenv.config({
    silent: true,
    path: ".env"
});
var model_1 = require("../../../app/modules/lead/model");
describe("Lead Model", function () {
    var testLead = model_1.LeadModel.createFake();
    testLead.reason_id = "152cacc7-5890-427e-82e1-47b6b21d5d72";
    it("should be able to create a lead", function (done) {
        new model_1.LeadModel()
            .save(testLead)
            .then(function (lead) {
            var createdLead = lead.toJSON();
            chai.expect(model_1.LeadModel.check(createdLead)).to.be.equal(true);
            testLead = createdLead;
            done();
        })
            .catch(function (err) {
            throw err;
        });
    });
    it("should be able to get that lead", function (done) {
        var shadowLead = {
            id: testLead.id
        };
        new model_1.LeadModel(shadowLead)
            .fetch({
            require: true,
        })
            .then(function (lead) {
            var recievedLead = lead.toJSON();
            chai.expect(model_1.LeadModel.check(recievedLead)).to.be.equal(true);
            chai.expect(recievedLead.id).to.be.eql(testLead.id);
            done();
        })
            .catch(function (err) {
            throw err;
        });
    });
    it("should be able to update that lead", function (done) {
        var toPatch = model_1.LeadModel.createFake();
        toPatch.id = testLead.id;
        toPatch.reason_id = testLead.reason_id;
        var shadowLead = {
            id: toPatch.id
        };
        new model_1.LeadModel(shadowLead)
            .save(toPatch)
            .then(function (lead) {
            var updatedLead = lead.toJSON();
            chai.expect(model_1.LeadModel.check(updatedLead)).to.be.equal(true);
            chai.expect(updatedLead).to.be.eql(toPatch);
            chai.expect(updatedLead.created_at.getTime()).to.be.below(updatedLead.updated_at.getTime());
            testLead = updatedLead;
            done();
        })
            .catch(function (err) {
            throw err;
        });
    });
    it("should be able to delete that lead", function (done) {
        var shadowLead = {
            id: testLead.id
        };
        new model_1.LeadModel(shadowLead)
            .destroy()
            .then(function (lead) {
            var deletdLead = lead.toJSON();
            chai.expect(testLead).not.to.be.eql(deletdLead);
            done();
        }).catch(function (err) {
            throw err;
        });
    });
});
