import { sendCode } from "lib/controllers/auth"
import { User } from "lib/models/user"
import methods from "micro-method-router"
import type { NextApiRequest,NextApiResponse } from "next"
export default methods({
    async post(req:NextApiRequest,res:NextApiResponse){
        let email = req.body.email
        let user = await sendCode(email)
        
        res.json({
            user
        })
    }
})