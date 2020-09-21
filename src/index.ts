import "reflect-metadata";
import { connect } from "./config/typeorm";
import { startServer } from "./app";

async function main() {
    connect();
    const app = await startServer();
    const PORT = process.env.PORT;
    app.listen(PORT || 3001)
    console.log("Server on port",PORT);
}

main();