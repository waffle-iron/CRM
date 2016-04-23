import * as dotenv from "dotenv";
import * as express from "express";
import * as supertest from "supertest";
import * as chai from "chai";

dotenv.config({
    silent: true,
    path: ".env"
});

import {LeadRouter as Router} from "../../../app/modules/lead/router";

describe("Lead Router", function () {
    const app = express();
    const router = new Router();
    router.setUpRoutes();
    app.use(router.Router);
    const request = supertest(app);

    describe("API OPTIONS", function () {
        it("should implement GET, POST on /", function (done) {
            request
                .options("/")
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        console.error(err);
                    }
                    else {
                        const options = res.header.allow.split(",");
                        chai.expect(options).to.include("GET");
                        chai.expect(options).to.include("POST");
                        done();
                    }
                });
        });

        it("should implement GET, PUT, PATCH, DELETE on /", function (done) {
            request
                .options("/id")
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        console.error(err);
                    }
                    else {
                        const options = res.header.allow.split(",");
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