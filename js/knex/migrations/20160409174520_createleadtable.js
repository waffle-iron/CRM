"use strict";
var up = function (knex) {
    return knex.schema.createTable("leads", function (table) {
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
exports.up = up;
var down = function (knex) {
    return knex.schema.dropTable("leads");
};
exports.down = down;
//# sourceMappingURL=20160409174520_createleadtable.js.map