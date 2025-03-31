import { DataSource } from "typeorm"
require('dotenv');


export const mysqlDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : undefined,
    username: process.env.DB_USER,
    password: process.env.DB_PSWD,
    database: process.env.DB_NAME,
    entities: ["src/entities/*.ts"],
    logging: true,
    synchronize: true,
})

