import * as dotenv from "dotenv"

try{
    dotenv.config();
}
catch(e){
    console.warn(e);
}

let database = {
    client: "pg",
    conection: process.env.DATABASE_URL
};

export {database}
