"use strict";
var server_1 = require("./server");
var morgan = require("morgan");
var dotenv = require("dotenv");
try {
    dotenv.config();
}
catch (e) {
    console.warn(e);
}
var server = new server_1.Server(5000);
server.setMiddlewares(morgan('combined'));
server.start();
//# sourceMappingURL=index.js.map