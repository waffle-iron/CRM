"use strict";
var supertest = require("supertest");
var dotenv = require("dotenv");
dotenv.config({
    silent: true,
    path: ".env"
});
var server_1 = require("../app/server");
describe("Server", function () {
    var url = "http://localhost:" + process.env.PORT;
    var server = new server_1.Server(process.env.PORT);
    before(function () {
        server.start();
    });
    describe("Start", function () {
        var request = supertest(url);
        it("server should return 200 on /api", function (done) {
            request
                .get("/api")
                .expect(200)
                .end(done);
        });
        it("server should return 404 on /foo", function (done) {
            request
                .get("/foo")
                .expect(404)
                .end(done);
        });
    });
    after(function () {
        server.stop();
    });
});
