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
import {lead} from "../../../app/modules/lead/model"

function checkLead(lead: lead): void {
    chai.expect(lead).to.have.property("lead_id");
    chai.expect(lead).to.have.property("firstname");
    chai.expect(lead).to.have.property("lastname");
    chai.expect(lead).to.have.property("email");
    chai.expect(lead).to.have.property("phone");
    chai.expect(lead).to.have.property("reason");
    chai.expect(lead).to.have.property("zipcode");
    chai.expect(lead).to.have.property("message");
    chai.expect(lead).to.have.property("created_at");
    chai.expect(lead).to.have.property("updated_at");
}

function createFakeLead(): lead {
    return {
        firstname: faker.name.firstName(),
        lastname: faker.name.lastName(),
        email: faker.internet.email(),
        reason: faker.lorem.words(2)
    }
}

describe("Lead Module", function () {
    const app: express.Application = express();
    const lead: Lead = new Lead();
    app.use(bodyparser.json());
    app.use(lead.Router);
    const request: supertest.SuperTest = supertest(app);

    describe("CREATE LEAD", function () {
        let testLead: lead = createFakeLead();

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
                        const lead: lead = res.body;
                        checkLead(lead);
                        testLead = res.body;
                        chai.expect((new Date(testLead.created_at)).getTime()).to.be.equal((new Date(testLead.updated_at)).getTime());
                        done();
                    }
                });
        });

        it("should be able to get the created lead on GET /:id", function (done) {
            request
                .get("/" + testLead.lead_id)
                .accept("application/json")
                .send()
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    else {
                        const lead: lead = res.body;
                        checkLead(lead);
                        done();
                    }
                });
        });

        it("should be able to update the whole created lead on put /:id", function (done) {
            let updatedTestLead = createFakeLead();
            request
                .put("/" + testLead.lead_id)
                .accept("application/json")
                .type("application/json")
                .send(updatedTestLead)
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    else {
                        const lead: lead = res.body;
                        checkLead(lead);
                        chai.expect(lead.lead_id).to.be.equal(testLead.lead_id);
                        testLead = lead;
                        chai.expect((new Date(testLead.created_at)).getTime()).to.be.below((new Date(testLead.updated_at)).getTime());
                        done();
                    }
                });
        });

        it("should be able to update created lead partially on patch /:id", function (done) {
            let toPatch = {
                firstname: faker.name.firstName()
            }
            request
                .patch("/" + testLead.lead_id)
                .accept("application/json")
                .type("application/json")
                .send(toPatch)
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    else {
                        const lead: lead = res.body;
                        checkLead(lead);
                        chai.expect(lead.lead_id).to.be.equal(testLead.lead_id);
                        testLead.firstname = toPatch.firstname;
                        chai.expect(lead).to.be.equal(lead);
                        testLead = lead;
                        chai.expect((new Date(testLead.created_at)).getTime()).to.be.below((new Date(testLead.updated_at)).getTime());
                        done();
                    }
                });
        });

        it("should be able to delete the lead on delete /:id", function (done) {
            request
                .delete("/" + testLead.lead_id)
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
                .get("/" + testLead.lead_id)
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