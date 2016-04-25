import * as faker from "faker";
import * as uuid from "node-uuid";

import * as Main from "../../model";
import {ReasonModel, reason} from "../reason/model"

export interface lead extends Main.main {
    firstname: string;
    lastname: string;
    email: string;
    phone?: string;
    reason_id: string;
    zipcode?: string;
    message?: string;
}

export class LeadModel extends Main.MainModel {
    get tableName() {
        return "leads";
    }
    get idAttribute() {
        return "id";
    }
    get hasTimestamps() {
        return true;
    }

    get reason() {
        return this.belongsTo(ReasonModel);
    }

    public static check(lead: lead): boolean {
        const valid: boolean = super.check(lead);

        if (valid &&
            lead.firstname && lead.lastname &&
            lead.email && lead.reason_id) {
            return true;
        }
        return false;
    }

    public static parseIt(lead: lead): lead {
        const main: Main.main = super.parseIt(lead);
        // const reason: reason = ReasonModel.parseIt(lead.reason);
        if (!this.check(lead)) {
            throw "Cannot parse reason";
        }
        return {
            id: main.id,
            firstname: lead.firstname,
            lastname: lead.lastname,
            email: lead.email,
            phone: lead.phone,
            reason_id: lead.reason_id,
            zipcode: lead.zipcode,
            message: lead.message,
            created_at: main.created_at,
            updated_at: main.updated_at
        }
    }

    public static createFake(): lead {
        const object: Main.main = super.createFake();
        const reason: reason = ReasonModel.createFake();
        return {
            id: object.id,
            firstname: faker.name.firstName(),
            lastname: faker.name.lastName(),
            email: faker.internet.email(),
            reason_id: reason.id,
            created_at: object.created_at,
            updated_at: object.updated_at
        }
    }
}