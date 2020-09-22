import { createConnection, getConnectionOptions, ConnectionOptions } from "typeorm";
import dotenv from 'dotenv';
dotenv.config();

import path from "path";

export async function connect() {
    const getOptions = async () => {
        let connectionOptions: ConnectionOptions;
        connectionOptions = {
          type: "mysql",
          host: "localhost",
          port: 3306,
          username: "root",
          password: "",
          database: "challenge_puzzle_graphql",
          entities: [
              path.join(__dirname, "../entity/**/**.ts")
          ],
          synchronize: true
        };
        if (process.env.DATABASE_URL) {
          Object.assign(connectionOptions, { url: process.env.DATABASE_URL });
        } else {
          // gets your default configuration
          // you could get a specific config by name getConnectionOptions('production')
          // or getConnectionOptions(process.env.NODE_ENV)
          connectionOptions = await getConnectionOptions(); 
        }
      
        return connectionOptions;
      };
      
      const connect2Database = async (): Promise<void> => {
          const typeormconfig = await getOptions();
          await createConnection(typeormconfig);
      };
      
      connect2Database().then(async () => {
          console.log('Connected to database');
      });
}




