/// <reference path="../../../typings/main.d.ts" />

import * as knex from "knex";
import * as Promise from "bluebird";

export function up(knex: knex): Promise<void> {
    return knex
        .schema
        .createTable("reasons", (table) => {
            table
                .uuid("id")
                .primary();
            table
                .string("text")
                .notNullable();
            table.timestamps();
        })
        .table("leads", (table) => {
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
};

export function down(knex: knex): Promise<void> {
    return knex
        .schema
        .table("leads", (table) => {
            table.renameColumn("id", "lead_id");
            table.dropForeign("reason_id");
            table.dropColumn("reason_id");
            table
                .string("reason")
                .notNullable()
        })
        .then((resolve) => {
            return knex
                .schema
                .dropTable("reasons");
        })
};
