import {Server as WebServer} from "./server"
import * as morgan from "morgan";
import {LeadController} from "./modules/lead/controller"


const server = new WebServer(5000);
server.setMiddlewares(morgan('combined'));

server.start();

let b = LeadController.createNewLead("aa","bb");

b.then((lead) => {
    console.log("sucess");
}).catch((err) => {
    console.log("fail");
});