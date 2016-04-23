"use strict";
var dotenv = require("dotenv");
var express = require("express");
var supertest = require("supertest");
var chai = require("chai");
dotenv.config({
    silent: true,
    path: ".env"
});
var router_1 = require("../../../app/modules/lead/router");
describe("Lead Router", function () {
    var app = express();
    var router = new router_1.LeadRouter();
    router.setUpRoutes();
    app.use(router.Router);
    var request = supertest(app);
    describe("API OPTIONS", function () {
        it("on / should implement GET, POST", function (done) {
            request
                .options("/")
                .expect(200)
                .end(function (err, res) {
                if (err) {
                    console.error(err);
                }
                else {
                    var options = res.header.allow.split(",");
                    chai.expect(options).to.include("GET");
                    chai.expect(options).to.include("POST");
                    done();
                }
            });
        });
        it("on /id should implement GET, PUT, PATCH, DELETE", function (done) {
            request
                .options("/id")
                .expect(200)
                .end(function (err, res) {
                if (err) {
                    console.error(err);
                }
                else {
                    var options = res.header.allow.split(",");
                    chai.expect(options).to.include("GET");
                    chai.expect(options).to.include("PUT");
                    chai.expect(options).to.include("PATCH");
                    chai.expect(options).to.include("DELETE");
                    done();
                }
            });
        });
    });
});
//# sourceMappingURL=router.test.js.map