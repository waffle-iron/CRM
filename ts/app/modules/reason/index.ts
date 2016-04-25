import * as express from "express";

import {ReasonRouter} from "./router";

export class Reason {
    private reasonRouter: ReasonRouter;
    constructor() {
        this.reasonRouter = new ReasonRouter();
        this.reasonRouter.setUpRoutes();
    }
    get Router(): express.Router {
        return this.reasonRouter.Router;
    }
}