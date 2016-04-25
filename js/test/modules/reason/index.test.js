"use strict";
var dotenv = require("dotenv");
var supertest = require("supertest");
var chai = require("chai");
var express = require("express");
var bodyparser = require("body-parser");
dotenv.config({
    silent: true,
    path: ".env"
});
var reason_1 = require("../../../app/modules/reason");
var model_1 = require("../../../app/modules/reason/model");
describe("Reason Module", function () {
    var app = express();
    var reason = new reason_1.Reason();
    app.use(bodyparser.json());
    app.use(reason.Router);
    var request = supertest(app);
    describe("CREATE REASON", function () {
        var testReason = model_1.ReasonModel.createFake();
        it("should be able to get all reasons on GET /", function (done) {
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
        it("should be able to create reason on POST /", function (done) {
            request
                .post("/")
                .type("application/json")
                .accept("application/json")
                .send(testReason)
                .expect(201)
                .end(function (err, res) {
                if (err) {
                    throw err;
                }
                else {
                    var reason_2 = model_1.ReasonModel.parseIt(res.body);
                    chai.expect(model_1.ReasonModel.check(reason_2)).to.be.equal(true);
                    testReason = reason_2;
                    chai.expect(testReason.created_at.getTime()).to.be.equal(testReason.updated_at.getTime());
                    done();
                }
            });
        });
        it("should be able to get the created reason on GET /:id", function (done) {
            request
                .get("/" + testReason.id)
                .accept("application/json")
                .send()
                .expect(200)
                .end(function (err, res) {
                if (err) {
                    throw err;
                }
                else {
                    var reason_3 = model_1.ReasonModel.parseIt(res.body);
                    chai.expect(model_1.ReasonModel.check(reason_3)).to.be.equal(true);
                    done();
                }
            });
        });
        it("should be able to update the whole created reason on put /:id", function (done) {
            var updatedTestReason = model_1.ReasonModel.createFake();
            request
                .put("/" + testReason.id)
                .accept("application/json")
                .type("application/json")
                .send(updatedTestReason)
                .expect(200)
                .end(function (err, res) {
                if (err) {
                    throw err;
                }
                else {
                    var reason_4 = model_1.ReasonModel.parseIt(res.body);
                    chai.expect(model_1.ReasonModel.check(reason_4)).to.be.equal(true);
                    chai.expect(reason_4.id).to.be.equal(testReason.id);
                    testReason = reason_4;
                    chai.expect(testReason.created_at.getTime()).to.be.below(testReason.updated_at.getTime());
                    done();
                }
            });
        });
        it("should be able to update created reason partially on patch /:id", function (done) {
            var toPatch = {
                text: model_1.ReasonModel.createFake().text
            };
            request
                .patch("/" + testReason.id)
                .accept("application/json")
                .type("application/json")
                .send(toPatch)
                .expect(200)
                .end(function (err, res) {
                if (err) {
                    throw err;
                }
                else {
                    var reason_5 = model_1.ReasonModel.parseIt(res.body);
                    chai.expect(model_1.ReasonModel.check(reason_5)).to.be.equal(true);
                    chai.expect(reason_5.id).to.be.equal(testReason.id);
                    testReason.text = toPatch.text;
                    testReason.updated_at = reason_5.updated_at;
                    chai.expect(testReason).to.be.eql(reason_5);
                    testReason = reason_5;
                    chai.expect(testReason.created_at.getTime()).to.be.below(testReason.updated_at.getTime());
                    done();
                }
            });
        });
        it("should be able to delete the reason on delete /:id", function (done) {
            request
                .delete("/" + testReason.id)
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
        it("should not be able to get the deleted reason on get /:id", function (done) {
            request
                .get("/" + testReason.id)
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
