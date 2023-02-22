import authMiddleware from "helper/middleware";
import { NextApiRequest, NextApiResponse } from "next";
import methods from "micro-method-router";
import { Order } from "lib/models/orders";
import { createPreference } from "lib/mercadopago";

const products = {
  1234: {
    title: "Mate de Guido",
    price: 150,
  },
};

async function postHandler(req: NextApiRequest, res: NextApiResponse, token) {
  let { productId } = req.query as any;
  const product = products[productId];
  if (!product) {
    res.send("No existe el producto");
  }
  const body = req.body;
  const data = {
    product: product,
    extra_information: body,
    userId: token,
    status: "pending",
  };
  const newOrder = await Order.createNewOrder(data);
  await newOrder.pull();
  const external_reference = newOrder.id;
  const pref = await createPreference({
    items: [
      {
        title: product.title,
        description: "Dummy description",
        picture_url: "http://www.myapp.com/myimage.jpg",
        category_id: "car_electronics",
        quantity: 1,
        currency_id: "ARS",
        unit_price: product.price,
      },
    ],
    back_urls: {
        success:"https://console.firebase.google.com/u/0/project/md-dwf-9-cap-4/firestore/data/~2Forder~2F2a1ngNPe5demQdjkQbRN?hl=es-419"
    },
    external_reference,
    notification_url:"mercadopago-pi.vercel.app/api/webhooks/mercadopago"
  });
console.log(pref)
  res.json({
    url:pref.init_point
  });
}

const handler = methods({
  post: postHandler,
});

export default authMiddleware(handler);
