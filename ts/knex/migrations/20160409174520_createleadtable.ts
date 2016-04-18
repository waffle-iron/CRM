import * as knex from "knex";
import * as Promise from "bluebird"

let up = function (knex: knex): Promise<void> {
    return knex.schema.createTable("leads", (table) => {
        table.uuid("lead_id")
            .primary()
            .unique();
        table.string("firstname")
            .notNullable();
        table.string("lastname")
            .notNullable();
        table.timestamps();
    });
};

let down = function (knex: knex): Promise<void> {
    return knex.schema.dropTable("leads");
};

export {up, down};