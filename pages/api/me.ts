import authMiddleware from "helper/middleware"
import { User } from "lib/models/user"
import methods from "micro-method-router"
import type { NextApiRequest,NextApiResponse } from "next"

const handler = methods({
    async get(req:NextApiRequest,res:NextApiResponse,decoded){
        console.log(decoded)
        let user = new User(decoded)
        await user.pull()
        let data = user.data
        res.json({
            data
        })
    }
})

export default authMiddleware(handler)