"use strict";
var server_1 = require("./server");
var morgan = require("morgan");
var controller_1 = require("./modules/lead/controller");
var server = new server_1.Server(5000);
server.setMiddlewares(morgan('combined'));
server.start();
var b = controller_1.LeadController.createNewLead("aa", "bb");
b.then(function (lead) {
    console.log("sucess");
}).catch(function (err) {
    console.log("fail");
});
//# sourceMappingURL=index.js.map