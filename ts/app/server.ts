import * as express from "express";
import * as http from "http";
import * as morgan from "morgan";
import * as bodyparser from "body-parser";

export class Server {
    private app: express.Express;
    private port: number;
    private server: http.Server;

    constructor(port: number) {
        this.port = port;
        this.app = express();
        this.setMiddlewares(bodyparser.json());

        const router = express.Router();
        router.get("/", (req, res) => {
            res.status(200).send("CRM API");
        });
        this.setApiRouter("", router);
    }
    
    public turnOnLogger(): void{
        this.setMiddlewares(morgan('combined'));
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

    public setApiRouter(address: string, router: express.Router): void {
        this.setRouter("/api" + address, router);
    }

    get App() {
        return this.app;
    }
}