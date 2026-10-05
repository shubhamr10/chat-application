import type {NextFunction, Request, Response} from "express";
import jwt from "jsonwebtoken";
import type {JwtPayload}  from "jsonwebtoken";

export function authHttp(req: Request, res: Response, next:NextFunction){
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        res.status(401).json({error: "NO TOKEN PROVIDED!"});
        return;
    }

    const token:string = authHeader.split(" ")[1] as string;
    try{
        req.user = jwt.verify(token, process.env["JWT_SECRET"] as string) as JwtPayload;
        next();
    } catch (e) {
        res.status(401).json({error: "INVALID TOKEN!"});
        return;
    }
}