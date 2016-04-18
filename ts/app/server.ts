import * as express from "express";
import * as http from "http";

export class Server {
    private app: express.Express;
    private port: number;
    private server: http.Server;

    constructor(port: number) {
        this.port = port;
        this.app = express();

        const router = express.Router();
        router.get("/", (req, res) => {
            res.status(200).send("Hello Vyrent!");
        });
        this.setApiRouter(router, "");
    }

    public start(): void {
        this.server = this.app.listen(this.port);
    }

    public stop(): void {
        this.server.close();
    }

    public setMiddlewares(...handlers: express.RequestHandler[]): void {
        handlers.forEach((handler: express.RequestHandler) => {
            this.app.use(handler)
        });
    }

    private setRouter(address: string, router: express.Router): void {
        this.app.use(address, router);
    }

    public setApiRouter(router: express.Router, address: string): void {
        this.setRouter("/api" + address, router);
    }
}