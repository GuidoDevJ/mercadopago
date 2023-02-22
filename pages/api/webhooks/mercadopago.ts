import { NextApiRequest, NextApiResponse } from "next"
import methods from "micro-method-router"
import { checkMerchantOrders } from "lib/mercadopago"
const postHandler=async (req:NextApiRequest,res:NextApiResponse)=>{
    const {id,topic} = req.query
    let body = await checkMerchantOrders(id.toString())
    res.json(body)
}

const handler = methods({
    post:postHandler
})

export default handler