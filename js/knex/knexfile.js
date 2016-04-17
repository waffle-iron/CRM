"use strict";
var dotenv = require("dotenv");
try {
    dotenv.config();
}
catch (e) {
    console.warn(e);
}
var database = {
    client: "pg",
    conection: process.env.DATABASE_URL
};
exports.database = database;
//# sourceMappingURL=knexfile.js.map