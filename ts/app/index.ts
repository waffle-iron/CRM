import * as dotenv from "dotenv";
import * as morgan from "morgan";
import * as bodyparser from "body-parser";

dotenv.config({silent: true});

import {Server as WebServer} from "./server";
import {LeadController} from "./modules/lead/controller";
import {Lead} from "./modules/lead";

const server = new WebServer(process.env.PORT);
server.setMiddlewares(morgan('combined'));
server.setMiddlewares(bodyparser.json());

const lead = new Lead();
server.setApiRouter("/lead", lead.Router);

server.start();