"use strict";
var up = function (knex, Promise) {
    return knex.schema.table("leads", function (table) {
        table.string("email")
            .notNullable();
        table.string("phone");
        table.string("reason")
            .notNullable();
        table.string("zipcode");
        table.string("message");
    });
};
exports.up = up;
var down = function (knex) {
    return knex.schema.table("leads", function (table) {
        table.dropColumn("email");
        table.dropColumn("phone");
        table.dropColumn("reason");
        table.dropColumn("zipcode");
        table.dropColumn("message");
    });
};
exports.down = down;
//# sourceMappingURL=20160417214940_completeleadtable.js.map