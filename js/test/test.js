"use strict";
var supertest = require("supertest");
var server_1 = require("../app/server");
describe("Server", function () {
    var url = "http://localhost:5000";
    var server = new server_1.Server(5000);
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
});
//# sourceMappingURL=test.js.map