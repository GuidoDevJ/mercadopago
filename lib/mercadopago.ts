import mercadopago from "mercadopago";

mercadopago.configure({
  access_token: process.env.MERCADO_PAGO,
});

export async function checkMerchantOrders(id: string) {
  try {
    const res = await mercadopago.merchant_orders.get(id);
    return res.body
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function createPreference(data:{}){
    try {
        const res = await mercadopago.preferences.create(data)
        return res.body
    } catch (error) {
        console.log(error)
        return error
    }
}
