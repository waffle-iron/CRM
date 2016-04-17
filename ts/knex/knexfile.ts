import * as dotenv from "dotenv"

dotenv.config({
    silent: true,
    path: "../../.env"
});

let database = {
    client: "pg",
    connection: process.env.DATABASE_URL
};

export {database}