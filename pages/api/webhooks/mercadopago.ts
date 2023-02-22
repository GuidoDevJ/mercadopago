import { NextApiRequest, NextApiResponse } from "next"
import methods from "micro-method-router"
import { checkMerchantOrders } from "lib/mercadopago"
import { Order } from "lib/models/orders"
const postHandler=async (req:NextApiRequest,res:NextApiResponse)=>{
    const {id,topic} = req.query
    if(topic=="merchant_order"){
        let order = await checkMerchantOrders(id.toString())
        if(order.order_status =="paid"){
            const orderId = order.external_reference
            let myOrder = new Order(orderId)
            await myOrder.pull()
            myOrder.data.status ="closed",
            await myOrder.push()
            console.log(order)
            res.json(order)
        }
    }
   
    
}

const handler = methods({
    post:postHandler
})

export default handler