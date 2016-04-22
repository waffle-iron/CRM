import * as express from "express";

import {LeadRouter} from "./router";

export class Lead {
    private leadRouter: LeadRouter;
    constructor() {
        this.leadRouter = new LeadRouter();
        this.leadRouter.setUpRoutes();
    }
    get Router(): express.Router {
        return this.leadRouter.Router;
    }
}