import {db as bookshelf} from "../../db"

export interface lead {
    lead_id?: string;
    firstname: string;
    lastname: string;
    email: string;
    phone?: string;
    reason: string;
    zipcode?: string;
    message?: string;
    created_at?: string;
    updated_at?: string;
}

export class LeadModel extends bookshelf.Model<LeadModel> {
    get tableName() {
        return "leads";
    }
    get idAttribute() {
        return "lead_id";
    }
    get hasTimestamps() {
        return true;
    }
}