import * as dotenv from "dotenv";
import * as supertest from "supertest";
import * as faker from "faker";
import * as chai from "chai";
import * as express from "express";
import * as bodyparser from "body-parser";

dotenv.config({
    silent: true,
    path: ".env"
});

import {Lead} from "../../../app/modules/lead";
import {LeadModel, lead} from "../../../app/modules/lead/model"

describe("Lead Module", function () {
    const app: express.Application = express();
    const lead: Lead = new Lead();
    app.use(bodyparser.json());
    app.use(lead.Router);
    const request: supertest.SuperTest = supertest(app);

    describe("CREATE LEAD", function () {
        let testLead: lead = LeadModel.createFake();
        testLead.reason_id = "152cacc7-5890-427e-82e1-47b6b21d5d72";

        it("should be able to get all leads on GET /", function (done) {
            request
                .get("/")
                .accept("application/json")
                .send()
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    else {
                        done();
                    }
                });
        });

        it("should be able to create lead on POST /", function (done) {
            request
                .post("/")
                .type("application/json")
                .accept("application/json")
                .send(testLead)
                .expect(201)
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    else {
                        const lead: lead = LeadModel.parseIt(res.body);
                        chai.expect(LeadModel.check(lead)).to.be.eql(true);
                        testLead = lead;
                        chai.expect(testLead.created_at.getTime()).to.be.equal(testLead.updated_at.getTime());
                        done();
                    }
                });
        });

        it("should be able to get the created lead on GET /:id", function (done) {
            request
                .get("/" + testLead.id)
                .accept("application/json")
                .send()
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    else {
                        const lead: lead = LeadModel.parseIt(res.body);
                        chai.expect(LeadModel.check(lead)).to.be.eql(true);
                        done();
                    }
                });
        });

        it("should be able to update the whole created lead on put /:id", function (done) {
            let updatedTestLead = LeadModel.createFake();
            updatedTestLead.reason_id = testLead.reason_id;
            request
                .put("/" + testLead.id)
                .accept("application/json")
                .type("application/json")
                .send(updatedTestLead)
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    else {
                        const lead: lead = LeadModel.parseIt(res.body);
                        chai.expect(LeadModel.check(lead)).to.be.eql(true);
                        chai.expect(lead.id).to.be.equal(testLead.id);
                        testLead = lead;
                        chai.expect(testLead.created_at.getTime()).to.be.below(testLead.updated_at.getTime());
                        done();
                    }
                });
        });

        it("should be able to update created lead partially on patch /:id", function (done) {
            let toPatch = {
                firstname: faker.name.firstName()
            }
            request
                .patch("/" + testLead.id)
                .accept("application/json")
                .type("application/json")
                .send(toPatch)
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    else {
                        const lead: lead = LeadModel.parseIt(res.body);
                        chai.expect(LeadModel.check(lead)).to.be.eql(true);
                        chai.expect(lead.id).to.be.equal(testLead.id);
                        testLead.firstname = toPatch.firstname;
                        testLead.updated_at = lead.updated_at;
                        chai.expect(testLead).to.be.eql(lead);
                        testLead = lead;
                        chai.expect(testLead.created_at.getTime()).to.be.below(testLead.updated_at.getTime());
                        done();
                    }
                });
        });

        it("should be able to delete the lead on delete /:id", function (done) {
            request
                .delete("/" + testLead.id)
                .accept("application/json")
                .send()
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    else {
                        done();
                    }
                })
        });

        it("should not be able to get the deleted lead on get /:id", function (done) {
            request
                .get("/" + testLead.id)
                .accept("application/json")
                .send()
                .expect(404)
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    else {
                        done();
                    }
                });
        });
    });
});