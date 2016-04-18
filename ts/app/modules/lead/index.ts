import {LeadRouter} from "./router"
import * as express from "express";

export class Lead {
    private leadRouter: LeadRouter;
    constructor() {
        this.leadRouter = new LeadRouter();
        this.leadRouter.setupRoutes();
    }
    get Router(): express.Router {
        return this.leadRouter.Router;
    }
}