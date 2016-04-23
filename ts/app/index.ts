import * as dotenv from "dotenv";

dotenv.config({silent: true});

import {Server as WebServer} from "./server";
import {Lead} from "./modules/lead";

const server = new WebServer(process.env.PORT);
server.turnOnLogger();

const lead = new Lead();
server.setApiRouter("/leads", lead.Router);

server.start();