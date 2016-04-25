import * as express from "express";

import {ReasonController} from "./controller";

export class ReasonRouter {
    private router: express.Router;

    constructor() {
        this.router = express.Router();
    }

    public setUpRoutes() {
        this.setUpGetRoute();
        this.setUpGetAllRoute();
        this.setUpPostRoute();
        this.setUpPutRoute();
        this.setUpDeleteRoute();
        this.setUpPatchRoute();
    }

    private setUpGetAllRoute() {
        this.router.get("/", (req, res) => {
            ReasonController
                .getAllReasons()
                .then((reasons) => {
                    res.status(200).json(reasons);
                })
                .catch((err) => {
                    res.status(500).json(err);
                });
        });
    }

    private setUpPostRoute() {
        this.router.post("/", (req, res) => {
            ReasonController
                .createNewReason(req.body)
                .then((reason) => {
                    res.status(201).json(reason);
                })
                .catch((err) => {
                    res.status(500).json(err);
                })
        });
    }

    private setUpGetRoute() {
        this.router.get("/:id", (req, res) => {
            const id = req.params.id;
            ReasonController
                .getReason(id)
                .then((reason) => {
                    res.status(200).json(reason);
                })
                .catch((err) => {
                    res.status(404).json(err);
                })
        });
    }

    private setUpPutRoute() {
        this.router.put("/:id", (req, res) => {
            let reason = req.body;
            reason.id = req.params.id;
            ReasonController
                .updateReason(reason)
                .then((reason) => {
                    res.status(200).json(reason);
                })
                .catch((err) => {
                    res.status(500).json(err);
                })
        });
    }

    private setUpPatchRoute() {
        this.router.patch("/:id", (req, res) => {
            let reason = req.body;
            reason.id = req.params.id;
            ReasonController
                .updateReason(reason)
                .then((reason) => {
                    res.status(200).json(reason);
                })
                .catch((err) => {
                    res.status(500).json(err);
                })
        });
    }

    private setUpDeleteRoute() {
        this.router.delete("/:id", (req, res) => {
            let id = req.params.id;
            ReasonController
                .deleteReason(id)
                .then((reason) => {
                    res.status(200).json(reason);
                })
                .catch((err) => {
                    res.status(500).json(err);
                })
        });
    }

    get Router(): express.Router {
        return this.router;
    }
}