import * as knex from "knex";
import {database as knexConnection} from "../knex/knexfile"
import * as bookshelf from "bookshelf"

let dbConnection = knex(knexConnection);
let db = bookshelf(dbConnection);

db.plugin('registry');

export {db};