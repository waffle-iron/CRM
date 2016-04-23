"use strict";
var dotenv = require("dotenv");
var supertest = require("supertest");
var faker = require("faker");
var chai = require("chai");
var express = require("express");
var bodyparser = require("body-parser");
dotenv.config({
    silent: true,
    path: ".env"
});
var lead_1 = require("../../../app/modules/lead");
function checkLead(lead) {
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
function createFakeLead() {
    return {
        firstname: faker.name.firstName(),
        lastname: faker.name.lastName(),
        email: faker.internet.email(),
        reason: faker.lorem.words(2)
    };
}
describe("Lead Module", function () {
    var app = express();
    var lead = new lead_1.Lead();
    app.use(bodyparser.json());
    app.use(lead.Router);
    var request = supertest(app);
    describe("CREATE LEAD", function () {
        var testLead = createFakeLead();
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
                    var lead_2 = res.body;
                    checkLead(lead_2);
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
                    var lead_3 = res.body;
                    checkLead(lead_3);
                    done();
                }
            });
        });
        it("should be able to update the whole created lead on put /:id", function (done) {
            var updatedTestLead = createFakeLead();
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
                    var lead_4 = res.body;
                    checkLead(lead_4);
                    chai.expect(lead_4.lead_id).to.be.equal(testLead.lead_id);
                    testLead = lead_4;
                    chai.expect((new Date(testLead.created_at)).getTime()).to.be.below((new Date(testLead.updated_at)).getTime());
                    done();
                }
            });
        });
        it("should be able to update created lead partially on patch /:id", function (done) {
            var toPatch = {
                firstname: faker.name.firstName()
            };
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
                    var lead_5 = res.body;
                    checkLead(lead_5);
                    chai.expect(lead_5.lead_id).to.be.equal(testLead.lead_id);
                    testLead.firstname = toPatch.firstname;
                    chai.expect(lead_5).to.be.equal(lead_5);
                    testLead = lead_5;
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
            });
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
