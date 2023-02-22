import { NextApiRequest, NextApiResponse } from "next"
import parseBearerToken from 'parse-bearer-token'
import { decodeToken } from "./jsonToken"

export default function authMiddleware(callback?){
    return function(req:NextApiRequest,res:NextApiResponse){
        const token = parseBearerToken(req)
        if(token === null){
            res.status(400).json({msg:"No paso ningun token"})
        }

        const decoded = decodeToken(token)
        if(!decoded){
            res.status(401).json({msg:"Token invalido"})
        }
        callback(req,res,decoded)
    }
}