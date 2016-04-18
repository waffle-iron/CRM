import * as knex from "knex";
import * as Promise from "bluebird"

let up = function (knex: knex, Promise): Promise<void> {
    return knex.schema.table("leads", (table) => {
        table.string("email")
            .notNullable();
        table.string("phone");
        table.string("reason")
            .notNullable();
        table.string("zipcode");
        table.string("message");
    });
};

let down = function (knex: knex): Promise<void> {
    return knex.schema.table("leads", (table) => {
        table.dropColumn("email");
        table.dropColumn("phone");
        table.dropColumn("reason");
        table.dropColumn("zipcode");
        table.dropColumn("message");
    });
};

export {up, down};