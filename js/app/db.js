"use strict";
var knex = require("knex");
var knexfile_1 = require("../knex/knexfile");
var bookshelf = require("bookshelf");
var dbConnection = knex(knexfile_1.development);
var db = bookshelf(dbConnection);
exports.db = db;
db.plugin('registry');
//# sourceMappingURL=db.js.map