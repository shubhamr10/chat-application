import express from "express";
import { pool } from "../db";
import { authHttp } from "../middleware/authHttp";

const router = express.Router();

router.get("/", authHttp, async (req, res) => {
    try{
        const results = await pool.query(`
            SELECT id, username, is_online, last_seen
            FROM users
            ORDER BY is_online DESC, username ASC
        `);
        res.status(200).json({
            users:results.rows,
            count:results.rows.length
        })
    } catch (e) {
        console.error("error occurred in users router:",e);
        res.status(500).json({error:"Internal server error!"});
    }
});

export default router;