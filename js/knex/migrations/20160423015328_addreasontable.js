"use strict";
function up(knex) {
    return knex
        .schema
        .createTable("reasons", function (table) {
        table
            .uuid("id")
            .primary();
        table
            .string("text")
            .notNullable();
        table.timestamps();
    })
        .table("leads", function (table) {
        table.renameColumn("lead_id", "id");
        table.dropColumn("reason");
        table
            .uuid("reason_id")
            .notNullable()
            .references("id")
            .inTable("reasons")
            .onDelete("RESTRICT")
            .onUpdate("CASCADE");
    });
}
exports.up = up;
;
function down(knex) {
    return knex
        .schema
        .table("leads", function (table) {
        table.renameColumn("id", "lead_id");
        table.dropForeign("reason_id");
        table.dropColumn("reason_id");
        table
            .string("reason")
            .notNullable();
    })
        .then(function (resolve) {
        return knex
            .schema
            .dropTable("reasons");
    });
}
exports.down = down;
;
