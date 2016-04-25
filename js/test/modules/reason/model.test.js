"use strict";
var dotenv = require("dotenv");
var chai = require("chai");
dotenv.config({
    silent: true,
    path: ".env"
});
var model_1 = require("../../../app/modules/reason/model");
describe("Reason Model", function () {
    var testReason = model_1.ReasonModel.createFake();
    it("should be able to create a reason", function (done) {
        new model_1.ReasonModel()
            .save(testReason)
            .then(function (reason) {
            var createdReason = reason.toJSON();
            chai.expect(model_1.ReasonModel.check(createdReason)).to.be.equal(true);
            testReason = createdReason;
            done();
        })
            .catch(function (err) {
            throw err;
        });
    });
    it("should be able to get that reason", function (done) {
        var shadowReason = {
            id: testReason.id
        };
        new model_1.ReasonModel(shadowReason)
            .fetch({
            require: true,
        })
            .then(function (reason) {
            var recievedReason = reason.toJSON();
            chai.expect(model_1.ReasonModel.check(recievedReason)).to.be.equal(true);
            chai.expect(recievedReason.id).to.be.eql(testReason.id);
            done();
        })
            .catch(function (err) {
            throw err;
        });
    });
    it("should be able to update that reason", function (done) {
        var toPatch = model_1.ReasonModel.createFake();
        toPatch.id = testReason.id;
        var shadowReason = {
            id: toPatch.id
        };
        new model_1.ReasonModel(shadowReason)
            .save(toPatch)
            .then(function (reason) {
            var updatedReason = reason.toJSON();
            chai.expect(model_1.ReasonModel.check(updatedReason)).to.be.equal(true);
            chai.expect(updatedReason).to.be.eql(toPatch);
            chai.expect(updatedReason.created_at.getTime()).to.be.below(updatedReason.updated_at.getTime());
            testReason = updatedReason;
            done();
        })
            .catch(function (err) {
            throw err;
        });
    });
    it("should be able to delete that reason", function (done) {
        var shadowReason = {
            id: testReason.id
        };
        new model_1.ReasonModel(shadowReason)
            .destroy()
            .then(function (reason) {
            var deletedReason = reason.toJSON();
            chai.expect(testReason).not.to.be.eql(deletedReason);
            done();
        }).catch(function (err) {
            throw err;
        });
    });
});
