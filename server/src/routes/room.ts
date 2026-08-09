import express from "express";
import { pool } from "../db";
import { authHttp } from "../middleware/authHttp";

const router = express.Router();

router.get("/", authHttp, async (req, res) => {
    try{
        const results = await pool.query(`SELECT * FROM rooms`);
        if(results.rows.length === 0){
            res.status(404).json({error:"No rooms available"});
            return;
        }
        res.status(200).json({
            rooms: results.rows,
            count: results.rows.length
        })
    } catch (e) {
        console.error(e);
        res.status(500).json({error:"Internal server error!"});
        return;
    }
});



export default  router;