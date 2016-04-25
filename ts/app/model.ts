import * as uuid from "node-uuid";
import * as faker from "faker";

import {db as bookshelf} from "./db";

export interface main {
    id: string;
    created_at: Date;
    updated_at: Date;
}

export abstract class MainModel extends bookshelf.Model<MainModel>{
    get idAttribute() {
        return "id";
    }
    get hasTimestamps() {
        return true;
    }

    public static createFake(): main {
        return {
            id: uuid.v4(),
            created_at: faker.date.recent(),
            updated_at: faker.date.recent()
        }
    };

    public static parseIt(main: main): main {
        if(!this.check(main)){
            throw "Cannot parse main";
        }
        return{
            id: main.id,
            created_at: new Date(main.created_at.toString()),
            updated_at: new Date(main.updated_at.toString())
        }
    }

    public static check(main: main): boolean {
        if (main.id && main.created_at && main.updated_at) {
            return true;
        }
        return false;
    };
}