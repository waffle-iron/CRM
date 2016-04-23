"use strict";
var dotenv = require("dotenv");
var morgan = require("morgan");
var bodyparser = require("body-parser");
dotenv.config({ silent: true });
var server_1 = require("./server");
var lead_1 = require("./modules/lead");
var server = new server_1.Server(process.env.PORT);
server.setMiddlewares(morgan('combined'));
server.setMiddlewares(bodyparser.json());
var lead = new lead_1.Lead();
server.setApiRouter("/leads", lead.Router);
server.start();
//# sourceMappingURL=index.js.map