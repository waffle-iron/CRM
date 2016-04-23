import * as uuid from "node-uuid";
import * as Promise from "bluebird"

import {LeadModel, lead} from "./model";

export class LeadController {
    constructor() {
    }

    public static createNewLead(lead: lead): Promise<any> {
        return new Promise((resolve, reject) => {
            lead.lead_id = uuid.v4();
            new LeadModel()
                .save(lead)
                .then((lead) => {
                    lead.timestamp();
                    return this.getLead(lead.get("lead_id"));
                })
                .then((lead)=>{
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
                });
        });
    }

    public static getLead(leadId: string): Promise<any> {
        let shadowLead = {
            lead_id: leadId
        }
        return new Promise((resolve, reject) => {
            new LeadModel(shadowLead)
                .fetch({
                    require: true
                })
                .then((lead) => {
                    resolve(lead);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    public static updateLead(lead: lead): Promise<any> {
        let shadowLead = {
            lead_id: lead.lead_id
        };
        return new Promise((resolve, reject) => {
            new LeadModel(shadowLead)
                .save(lead)
                .then((lead) => {
                    lead.timestamp();
                    return this.getLead(lead.get("lead_id"));
                })
                .then((lead)=>{
                    resolve(lead)
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    public static deleteLead(leadId: string): Promise<any> {
        let shadowLead = {
            lead_id: leadId
        };
        return new Promise((resolve, reject) => {
            new LeadModel(shadowLead)
                .destroy()
                .then((lead) => {
                    resolve(lead);
                })
                .catch((err) => {
                    reject(err);
                })
        });
    }
}