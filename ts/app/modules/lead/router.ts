import * as jwt from "express-jwt";
import * as express from "express";
import {LeadController} from "./controller";

const jwtCheck = jwt({
    secret: new Buffer(process.env.JWT_SECRET, 'base64'),
    audience: process.env.JWT_AUDIENCE,
    credentialsRequired: false
});

export class LeadRouter {
    private router: express.Router;

    constructor() {
        this.router = express.Router();
    }

    public setUpRoutes() {
        this.setUpGetRoute();
        this.setUpGetAllRoute();
        this.setUpPostRoute();
    }

    private setUpGetAllRoute() {
        this.router.get("/", jwtCheck, (req, res) => {
            LeadController.getAllLeads()
                .then((leads) => {
                    res.status(200).send(leads);
                })
                .catch((err) => {
                    res.status(500).send(err);
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
                    res.status(201).send(lead);
                })
                .catch((err) => {
                    console.log(err);
                    res.status(500).send(err);
                })
        });
    }

    private setUpGetRoute() {
        this.router.get("/:leadId", (req, res) => {
            const leadId = req.params.leadId;
            LeadController.getLead(leadId)
                .then((lead) => {
                    res.status(200).send(lead);
                })
                .then((err) => {
                    res.status(404).send(err);
                })
        });
    }

    get Router(): express.Router {
        return this.router;
    }
}