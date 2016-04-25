import * as Promise from "bluebird";
import * as dotenv from "dotenv";
import * as chai from "chai";

dotenv.config({
    silent: true,
    path: ".env"
});

import {LeadModel, lead} from "../../../app/modules/lead/model"

describe("Lead Model", function () {
    let testLead: lead = LeadModel.createFake();
    testLead.reason_id = "152cacc7-5890-427e-82e1-47b6b21d5d72";

    it("should be able to create a lead", function (done) {
        new LeadModel()
            .save(testLead)
            .then((lead) => {
                const createdLead: lead = lead.toJSON();
                chai.expect(LeadModel.check(createdLead)).to.be.equal(true);
                testLead = createdLead;
                done();
            })
            .catch((err) => {
                throw err;
            });
    });

    it("should be able to get that lead", function (done) {
        const shadowLead = {
            id: testLead.id
        };

        new LeadModel(shadowLead)
            .fetch({
                require: true,
            })
            .then((lead) => {
                const recievedLead: lead = lead.toJSON();
                chai.expect(LeadModel.check(recievedLead)).to.be.equal(true);
                chai.expect(recievedLead.id).to.be.eql(testLead.id);
                done();
            })
            .catch((err) => {
                throw err;
            });
    });

    it("should be able to update that lead", function (done) {
        const toPatch: lead = LeadModel.createFake();
        toPatch.id = testLead.id;
        toPatch.reason_id = testLead.reason_id;

        const shadowLead = {
            id: toPatch.id
        };

        new LeadModel(shadowLead)
            .save(toPatch)
            .then((lead) => {
                const updatedLead: lead = lead.toJSON();
                chai.expect(LeadModel.check(updatedLead)).to.be.equal(true);
                chai.expect(updatedLead).to.be.eql(toPatch);
                chai.expect(updatedLead.created_at.getTime()).to.be.below(updatedLead.updated_at.getTime());
                testLead = updatedLead;
                done();
            })
            .catch((err) => {
                throw err;
            });
    });

    it("should be able to delete that lead", function (done) {
        const shadowLead = {
            id: testLead.id
        }
        new LeadModel(shadowLead)
            .destroy()
            .then((lead) => {
                const deletdLead: lead = lead.toJSON();
                chai.expect(testLead).not.to.be.eql(deletdLead);
                done();
            }).catch((err) => {
                throw err;
            });
    });
});