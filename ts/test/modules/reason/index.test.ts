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

import {Reason} from "../../../app/modules/reason";
import {ReasonModel, reason} from "../../../app/modules/reason/model"


describe("Reason Module", function () {
    const app: express.Application = express();
    const reason: Reason = new Reason();
    app.use(bodyparser.json());
    app.use(reason.Router);
    const request: supertest.SuperTest = supertest(app);

    describe("CREATE REASON", function () {
        let testReason: reason = ReasonModel.createFake();

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
                        const reason: reason = ReasonModel.parseIt(res.body);
                        chai.expect(ReasonModel.check(reason)).to.be.equal(true);
                        testReason = reason;
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
                        const reason: reason = ReasonModel.parseIt(res.body);
                        chai.expect(ReasonModel.check(reason)).to.be.equal(true);
                        done();
                    }
                });
        });

        it("should be able to update the whole created reason on put /:id", function (done) {
            let updatedTestReason = ReasonModel.createFake();
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
                        const reason: reason = ReasonModel.parseIt(res.body);
                        chai.expect(ReasonModel.check(reason)).to.be.equal(true);
                        chai.expect(reason.id).to.be.equal(testReason.id);
                        testReason = reason;
                        chai.expect(testReason.created_at.getTime()).to.be.below(testReason.updated_at.getTime());
                        done();
                    }
                });
        });

        it("should be able to update created reason partially on patch /:id", function (done) {
            let toPatch = {
                text: ReasonModel.createFake().text
            }
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
                        const reason: reason = ReasonModel.parseIt(res.body);
                        chai.expect(ReasonModel.check(reason)).to.be.equal(true);
                        chai.expect(reason.id).to.be.equal(testReason.id);
                        testReason.text = toPatch.text;
                        testReason.updated_at = reason.updated_at;
                        chai.expect(testReason).to.be.eql(reason);
                        testReason = reason;
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
                })
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