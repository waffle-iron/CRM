import {LeadModel, lead} from "./model";
import * as uuid from "node-uuid";
import * as Promise from "bluebird"

export class LeadController {
    constructor() {
    }

    public static createNewLead(lead: lead): Promise<any> {
        return new Promise((resolve, reject) => {
            new LeadModel()
                .save({
                    firstname: lead.firstname,
                    lastname: lead.lastname,
                    email: lead.email,
                    phone: lead.phone,
                    reason: lead.reason,
                    zipcode: lead.zipcode,
                    message: lead.message,
                    lead_id: uuid.v4()
                })
                .then((lead) => {
                    lead.timestamp();
                    resolve(lead);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    public static getAllLeads(): Promise<any> {
        return new Promise((resolve, reject) => {
            new LeadModel()
                .fetchAll()
                .then((leads) => {
                    resolve(leads);
                })
                .catch((err) => {
                    reject(err);
                })
        });
    }

    public static getLead(leadId: string): Promise<any> {
        return new Promise((resolve, reject) => {
            new LeadModel({
                "lead_id": leadId
            })
                .fetch()
                .then((lead) => {
                    resolve(lead);
                })
                .catch((err) => {
                    reject(err);
                })
        });
    }
}