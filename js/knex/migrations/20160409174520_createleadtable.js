"use strict";
function up(knex) {
    return knex
        .schema
        .createTable("leads", function (table) {
        table
            .uuid("lead_id")
            .primary();
        table
            .string("firstname")
            .notNullable();
        table
            .string("lastname")
            .notNullable();
        table.timestamps();
    });
}
exports.up = up;
;
function down(knex) {
    return knex
        .schema
        .dropTable("leads");
}
exports.down = down;
;
