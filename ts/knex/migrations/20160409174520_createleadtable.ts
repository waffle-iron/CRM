/// <reference path="../../../typings/main.d.ts" />

import * as knex from "knex";
import * as Promise from "bluebird"

export function up(knex: knex): Promise<void> {
    return knex
        .schema
        .createTable("leads", (table) => {
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
};

export function down(knex: knex): Promise<void> {
    return knex
        .schema
        .dropTable("leads");
};