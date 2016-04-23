"use strict";
var dotenv = require("dotenv");
dotenv.config({
    silent: true,
    path: "../../.env"
});
var database = {
    client: "pg",
    connection: process.env.DATABASE_URL
};
exports.database = database;
