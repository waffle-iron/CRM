import * as jwt from "express-jwt";
import * as express from "express";

const jwtCheck = jwt({
    secret: new Buffer(process.env.JWT_SECRET, 'base64'),
    audience: process.env.JWT_AUDIENCE,
    credentialsRequired: false
});

import {LeadController} from "./controller";

export class LeadRouter {
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
        this.router.get("/", jwtCheck, (req, res) => {
            LeadController
                .getAllLeads()
                .then((leads) => {
                    res.status(200).json(leads);
                })
                .catch((err) => {
                    res.status(500).json(err);
                });
        });
    }

    private setUpPostRoute() {
        this.router.post("/", (req, res) => {
            LeadController
                .createNewLead(req.body)
                .then((lead) => {
                    res.status(201).json(lead);
                })
                .catch((err) => {
                    res.status(500).json(err);
                })
        });
    }

    private setUpGetRoute() {
        this.router.get("/:id", (req, res) => {
            const id = req.params.id;
            LeadController
                .getLead(id)
                .then((lead) => {
                    res.status(200).json(lead);
                })
                .catch((err) => {
                    res.status(404).json(err);
                })
        });
    }

    private setUpPutRoute() {
        this.router.put("/:id", (req, res) => {
            let lead = req.body;
            lead.id = req.params.id;
            LeadController
                .updateLead(lead)
                .then((lead) => {
                    res.status(200).json(lead);
                })
                .catch((err) => {
                    res.status(500).json(err);
                })
        });
    }

    private setUpPatchRoute() {
        this.router.patch("/:id", (req, res) => {
            let lead = req.body;
            lead.id = req.params.id;
            LeadController
                .updateLead(lead)
                .then((lead) => {
                    res.status(200).json(lead);
                })
                .catch((err) => {
                    res.status(500).json(err);
                })
        });
    }

    private setUpDeleteRoute() {
        this.router.delete("/:id", (req, res) => {
            let id = req.params.id;
            LeadController
                .deleteLead(id)
                .then((lead) => {
                    res.status(200).json(lead);
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