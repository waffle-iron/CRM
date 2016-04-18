import * as express from "express";
import {LeadController} from "./controller"

export class LeadRouter {
    private router: express.Router;

    constructor() {
        this.router = express.Router();
    }

    public setupRoutes() {
        this.setUpGetRoute();
        this.setUpPostRoute();
    }

    private setUpGetRoute() {
        this.router.get("/", (req, res) => {
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

    get Router(): express.Router {
        return this.router;
    }
}