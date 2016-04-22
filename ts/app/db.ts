import * as knex from "knex";
import * as bookshelf from "bookshelf"

import {database as knexConnection} from "../knex/knexfile"

let dbConnection = knex(knexConnection);
let db = bookshelf(dbConnection);

db.plugin('registry');

export {db};