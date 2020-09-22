import { createConnection } from "typeorm";
import path from "path";

export async function connect() {
    await createConnection({
        type: "mysql",
        host: process.env.BD_HOST,
        port: 3306,
        username: "root",
        password: "",
        database: "challenge_puzzle_graphql",
        entities: [
            path.join(__dirname, "../entity/**/**.ts")
        ],
        synchronize: true

    });
    console.log("Database is connected");
}


