/// <reference path="../../typings/main.d.ts" />

import * as chai from "chai"
import * as supertest from "supertest"
import {Server as WebServer} from "../app/server"
import * as dotenv from "dotenv"

dotenv.config({
    silent: true,
    path: ".env"
});

describe("Server", function() {
    const url = "http://localhost:"+process.env.PORT;
    const server = new WebServer(process.env.PORT);
    before(function() {
        server.start();
    });
    describe("Start", function() {
        const request = supertest(url);
        it("server should return 200 on /api", function(done) {
            request
                .get("/api")
                .expect(200)
                .end(done);
        });
        it("server should return 404 on /foo", function(done) {
            request
                .get("/foo")
                .expect(404)
                .end(done);
        });
    });
});