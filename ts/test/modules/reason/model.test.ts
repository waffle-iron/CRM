import * as Promise from "bluebird";
import * as dotenv from "dotenv";
import * as chai from "chai";

dotenv.config({
    silent: true,
    path: ".env"
});

import {ReasonModel, reason} from "../../../app/modules/reason/model"

describe("Reason Model", function () {
    let testReason: reason = ReasonModel.createFake();
    it("should be able to create a reason", function (done) {
        new ReasonModel()
            .save(testReason)
            .then((reason) => {
                const createdReason: reason = reason.toJSON();
                chai.expect(ReasonModel.check(createdReason)).to.be.equal(true);
                testReason = createdReason;
                done();
            })
            .catch((err) => {
                throw err;
            });
    });

    it("should be able to get that reason", function (done) {
        const shadowReason = {
            id: testReason.id
        };

        new ReasonModel(shadowReason)
            .fetch({
                require: true,
            })
            .then((reason) => {
                const recievedReason: reason = reason.toJSON();
                chai.expect(ReasonModel.check(recievedReason)).to.be.equal(true);
                chai.expect(recievedReason.id).to.be.eql(testReason.id);
                done();
            })
            .catch((err) => {
                throw err;
            });
    });

    it("should be able to update that reason", function (done) {
        const toPatch: reason = ReasonModel.createFake();
        toPatch.id = testReason.id;

        const shadowReason = {
            id: toPatch.id
        };

        new ReasonModel(shadowReason)
            .save(toPatch)
            .then((reason) => {
                const updatedReason: reason = reason.toJSON();
                chai.expect(ReasonModel.check(updatedReason)).to.be.equal(true);
                chai.expect(updatedReason).to.be.eql(toPatch);
                chai.expect(updatedReason.created_at.getTime()).to.be.below(updatedReason.updated_at.getTime());
                testReason = updatedReason;
                done();
            })
            .catch((err) => {
                throw err;
            });
    });

    it("should be able to delete that reason", function (done) {
        const shadowReason = {
            id: testReason.id
        }
        new ReasonModel(shadowReason)
            .destroy()
            .then((reason) => {
                const deletedReason: reason = reason.toJSON();
                chai.expect(testReason).not.to.be.eql(deletedReason);
                done();
            }).catch((err) => {
                throw err;
            });
    });
});