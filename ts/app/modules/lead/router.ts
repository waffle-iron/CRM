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
            LeadController.getAllLeads()
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
            LeadController.createNewLead({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                phone: req.body.phone,
                reason: req.body.reason,
                zipcode: req.body.zipcode,
                message: req.body.message
            })
                .then((lead) => {
                    res.status(201).json(lead);
                })
                .catch((err) => {
                    res.status(500).json(err);
                })
        });
    }

    private setUpGetRoute() {
        this.router.get("/:leadId", (req, res) => {
            const leadId = req.params.leadId;
            LeadController.getLead(leadId)
                .then((lead) => {
                    res.status(200).json(lead);
                })
                .then((err) => {
                    res.status(404).json(err);
                })
        });
    }

    private setUpPutRoute() {
        this.router.put("/:leadId", (req, res) => {
            res.status(500).json({});
        });
    }
    
    private setUpPatchRoute() {
        this.router.patch("/:leadId", (req, res) => {
            res.status(500).json({});
        });
    }
    
    private setUpDeleteRoute() {
        this.router.delete("/:leadId", (req, res) => {
            res.status(500).json({});
        });
    }

    get Router(): express.Router {
        return this.router;
    }
}