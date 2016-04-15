import {LeadModel} from "./model";
import * as uuid from "node-uuid";
import * as Promise from "bluebird"

export class LeadController {
    constructor() {
    }

    public static createNewLead(firstname, lastname): Promise<any> {
        return new Promise((resolve, reject) => {
            new LeadModel()
                .save({
                    firstname: firstname,
                    lastname: lastname,
                    lead_id: uuid.v4()
                }).then((lead) => {
                    lead.timestamp();
                    resolve(lead);
                }).catch((err) => {
                    reject(err);
                });
        });
    }
}