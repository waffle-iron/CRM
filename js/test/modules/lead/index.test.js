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
var model_1 = require("../../../app/modules/lead/model");
describe("Lead Module", function () {
    var app = express();
    var lead = new lead_1.Lead();
    app.use(bodyparser.json());
    app.use(lead.Router);
    var request = supertest(app);
    describe("CREATE LEAD", function () {
        var testLead = model_1.LeadModel.createFake();
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
                    var lead_2 = model_1.LeadModel.parseIt(res.body);
                    chai.expect(model_1.LeadModel.check(lead_2)).to.be.eql(true);
                    testLead = lead_2;
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
                    var lead_3 = model_1.LeadModel.parseIt(res.body);
                    chai.expect(model_1.LeadModel.check(lead_3)).to.be.eql(true);
                    done();
                }
            });
        });
        it("should be able to update the whole created lead on put /:id", function (done) {
            var updatedTestLead = model_1.LeadModel.createFake();
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
                    var lead_4 = model_1.LeadModel.parseIt(res.body);
                    chai.expect(model_1.LeadModel.check(lead_4)).to.be.eql(true);
                    chai.expect(lead_4.id).to.be.equal(testLead.id);
                    testLead = lead_4;
                    chai.expect(testLead.created_at.getTime()).to.be.below(testLead.updated_at.getTime());
                    done();
                }
            });
        });
        it("should be able to update created lead partially on patch /:id", function (done) {
            var toPatch = {
                firstname: faker.name.firstName()
            };
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
                    var lead_5 = model_1.LeadModel.parseIt(res.body);
                    chai.expect(model_1.LeadModel.check(lead_5)).to.be.eql(true);
                    chai.expect(lead_5.id).to.be.equal(testLead.id);
                    testLead.firstname = toPatch.firstname;
                    testLead.updated_at = lead_5.updated_at;
                    chai.expect(testLead).to.be.eql(lead_5);
                    testLead = lead_5;
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
            });
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