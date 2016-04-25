import * as uuid from "node-uuid";
import * as Promise from "bluebird"

import {LeadModel, lead} from "./model";

export class LeadController {
    constructor() {
    }

    public static createNewLead(lead: lead): Promise<any> {
        return new Promise((resolve, reject) => {
            lead.id = uuid.v4();
            new LeadModel()
                .save(lead)
                .then((lead) => {
                    lead.timestamp();
                    return this.getLead(lead.get("id"));
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

    public static getLead(id: string): Promise<any> {
        let shadowLead = {
            id: id
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
            id: lead.id
        };
        return new Promise((resolve, reject) => {
            new LeadModel(shadowLead)
                .save(lead)
                .then((lead) => {
                    lead.timestamp();
                    return this.getLead(lead.get("id"));
                })
                .then((lead)=>{
                    resolve(lead)
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    public static deleteLead(id: string): Promise<any> {
        let shadowLead = {
            id: id
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