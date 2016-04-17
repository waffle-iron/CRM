"use strict";
var server_1 = require("./server");
var morgan = require("morgan");
var dotenv = require("dotenv");
dotenv.config({ silent: true });
var server = new server_1.Server(process.env.PORT);
server.setMiddlewares(morgan('combined'));
server.start();
//# sourceMappingURL=index.js.map