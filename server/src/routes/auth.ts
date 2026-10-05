import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { pool } from "../db";

const router = express.Router();

router.post("/register", async (req, res) => {
    const { username, email, password } = req.body;

    // Step - 1 simple validate the input
    if(!username || !email || !password){
        res. status(400).json({error: "All fields are required!"});
        return;
    }

    try{
        // step - 2 : check uniqueness
        const existing = await pool.query(`
            SELECT id FROM users WHERE email=$1 OR username=$2
        `, [email, username]);
        if(existing.rows.length > 0){
            res.status(409).json({error:"Email or Username already exists!"});
            return;
        }

        // step - 3 :  hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // step - 4 : Insert user
        const result = await pool.query(`
            INSERT INTO users(username, email, password)
                VALUES ($1, $2, $3)
            RETURNING id, username, email
        `, [username, email, hashedPassword]);

        const user = result.rows[0];

        // step - 5 : Create JWT
        const token = jwt.sign({
            id: user.id,
            username: user.username,
        }, process.env["JWT_SECRET"] as string, {expiresIn:"7d"});
        res.status(201).json({token, user});
    } catch (e) {
        console.error(e);
        res.status(500).json({error:"Internal server error!"});
        return;
    }
});


router.post("/login", async( req, res )=> {
    const { email, password } = req.body;
    // Step - 1 : Validate the email & password
    if(!email || !password){
        res.status(400).json({error:"All fields are required!"});
        return;
    }

    try{
        // Step - 2 : Find the user by email in the database
        const result = await pool.query(`
            SELECT id, password, username, email FROM users WHERE email=$1
        `,[email]);
        if(result.rows.length === 0){
            res.status(404).json({error:"User or password is incorrect"});
            return;
        }
        const user = result.rows[0];
        // compare the password
        const isPasswordMatched = await bcrypt.compare(password, user.password);
        if(isPasswordMatched){
            const token = jwt.sign({
                id: user.id,
                username: user.username
            }, process.env["JWT_SECRET"] as string, {expiresIn:"7d"});
            const userObject = {
                id: user.id,
                username: user.username,
                email: user.email
            }
            res.status(200).json({token,userObject});
            return;
        } else {
            res.status(401).json({error:"User or password is incorrect"});
            return;
        }
    } catch (e) {
        console.error(e);
        res.status(500).json({error:"Internal server error!"});
        return;
    }
});


export default router;