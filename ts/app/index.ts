import {Server as WebServer} from "./server"
import * as morgan from "morgan";
import {LeadController} from "./modules/lead/controller"
import * as dotenv from "dotenv"

dotenv.config({silent: true});

const server = new WebServer(process.env.PORT);
server.setMiddlewares(morgan('combined'));

server.start();