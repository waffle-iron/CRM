import * as faker from "faker";

import * as Main from "../../model";
import {LeadModel, lead} from "../lead/model"

export interface reason extends Main.main {
    text: string;
}

export class ReasonModel extends Main.MainModel {
    get tableName() {
        return "reasons";
    }
    
    get leads(){
        return this.hasMany(LeadModel);
    }

    public static check(reason: reason): boolean {
        const valid: boolean = super.check(reason);
        if (valid && reason.text) {
            return true;
        }
        return false;
    }
    
    public static parseIt(reason: reason): reason{
        const main: Main.main = super.parseIt(reason);
        if(!this.check(reason)){
            throw "Cannot parse reason";
        }
        return {
            id: main.id,
            text: reason.text,
            created_at: main.created_at,
            updated_at: main.updated_at
        }
    }

    public static createFake(): reason {
        const main: Main.main = super.createFake();
        return {
            id: main.id,
            text: faker.lorem.words(1),
            created_at: main.created_at,
            updated_at: main.updated_at
        }
    }
}