import {db as bookshelf} from "../../db"

export class LeadModel extends bookshelf.Model<LeadModel> {
    get tableName() {
        return "leads";
    }
    get idAttribute(){
        return "lead_id";
    }
    get hasTimestamps(){
        return true;
    }
}