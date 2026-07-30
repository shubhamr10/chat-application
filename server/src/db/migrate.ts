import { pool } from "./index";

async function migrate(){
    await pool.query(`
        CREATE TABLE IF NOT EXISTS users(
            id SERIAL PRIMARY KEY,
            username VARCHAR(50) UNIQUE NOT NULL,
            email VARCHAR(50) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT NOW()
        )
    `);

    console.log("Migration completed - user table ready!");
    await pool.end();
}

migrate().catch(console.error);