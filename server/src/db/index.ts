import { Pool } from "pg";
import dotenv from "dotenv";

// Initialise the env
dotenv.config();

export const pool = new Pool({
    user:process.env["DB_USER"],
    password:process.env["DB_PASSWORD"],
    host:process.env["DB_HOST"],
    port:Number(process.env["DB_PORT"]),
    database:process.env["DB_NAME"]
});

pool.on("error", (err) => {
    console.error("Unexpected database error:", err);
    process.exit(-1);
});
