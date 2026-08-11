import { pool } from "./index";
import type { Message } from "../types";

export async function saveMessages(
    content:string,
    senderId:number,
    roomId:number
): Promise<void>{
    await pool.query(`
        INSERT INTO messages (content, sender_id, room_id)
        VALUES ($1, $2, $3)
    `,[content, senderId, roomId]);
}

export async function getMessagesByRoom(roomId:number):Promise<Message[]> {
    const results = await pool.query(`
        SELECT
            m.id,
            m.content,
            u.username AS sender,
            m.room_id as roomId,
            m.created_at AS TIMESTAMP
        FROM messages m
        JOIN users u ON m.sender_id = u.id
        WHERE m.room_id = $1
        ORDER BY m.created_at ASC
    `,[roomId]);
    return results.rows;
}