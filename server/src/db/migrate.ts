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

    await pool.query(`
        CREATE TABLE IF NOT EXISTS rooms (
            id SERIAL PRIMARY KEY,
            name VARCHAR(50) UNIQUE NOT NULL,
            created_at TIMESTAMP DEFAULT NOW()
        )
    `);

    await pool.query(`
        INSERT INTO rooms (name) VALUES ('general'), ('project-delta'), ('coffee-talk'), ('project-talk')
        ON CONFLICT (name) DO NOTHING
    `);

    await pool.query(`
    CREATE TABLE IF NOT EXISTS messages (
        id SERIAL PRIMARY KEY,
        content TEXT NOT NULL,
        sender_id INTEGER REFERENCES users(id),
        room_id INTEGER REFERENCES rooms(id),
        created_at TIMESTAMP DEFAULT NOW()
        )
    `);

    await pool.query(`
        ALTER TABLE users
        ADD COLUMN IF NOT EXISTS is_online BOOLEAN DEFAULT FALSE,
        ADD COLUMN IF NOT EXISTS last_seen TIMESTAMP DEFAULT NOW()
    `);

    console.log("Migration completed - user, rooms, messages table ready!");
    await pool.end();
}

migrate().catch(console.error);