"use strict";
var knex = require("knex");
var bookshelf = require("bookshelf");
var knexfile_1 = require("../knex/knexfile");
var dbConnection = knex(knexfile_1.database);
var db = bookshelf(dbConnection);
exports.db = db;
db.plugin('registry');
//# sourceMappingURL=db.js.map