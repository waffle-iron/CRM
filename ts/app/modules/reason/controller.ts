import * as uuid from "node-uuid";
import * as Promise from "bluebird"

import {ReasonModel, reason} from "./model";

export class ReasonController {
    constructor() {
    }

    public static createNewReason(reason: reason): Promise<any> {
        return new Promise((resolve, reject) => {
            reason.id = uuid.v4();
            new ReasonModel()
                .save(reason)
                .then((reason) => {
                    reason.timestamp();
                    return this.getReason(reason.get("id"));
                })
                .then((reason) => {
                    resolve(reason);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    public static getAllReasons(): Promise<any> {
        return new Promise((resolve, reject) => {
            new ReasonModel()
                .fetchAll()
                .then((reasons) => {
                    resolve(reasons);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    public static getReason(id: string): Promise<any> {
        const shadowReason = {
            id: id
        }
        return new Promise((resolve, reject) => {
            new ReasonModel(shadowReason)
                .fetch({
                    require: true
                })
                .then((reason) => {
                    resolve(reason);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    public static updateReason(reason: reason): Promise<any> {
        const shadowReason = {
            id: reason.id
        };
        return new Promise((resolve, reject) => {
            new ReasonModel(shadowReason)
                .save(reason)
                .then((reason) => {
                    reason.timestamp();
                    return this.getReason(reason.get("id"));
                })
                .then((reason) => {
                    resolve(reason)
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    public static deleteReason(id: string): Promise<any> {
        const shadowReason = {
            id: id
        };
        return new Promise((resolve, reject) => {
            new ReasonModel(shadowReason)
                .destroy()
                .then((reason) => {
                    resolve(reason);
                })
                .catch((err) => {
                    reject(err);
                })
        });
    }
}