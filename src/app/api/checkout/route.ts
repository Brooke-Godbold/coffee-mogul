import type { NextRequest } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

async function createPaymentIntent(
  amount: number,
  email: string,
  orderItems: [{ name: string; quantity: number }]
) {
  return await stripe.paymentIntents.create({
    amount,
    currency: "gbp",
    automatic_payment_methods: {
      enabled: true,
    },
    metadata: {
      email,
      totalPrice: amount,
      orderItems: JSON.stringify(orderItems),
    },
  });
}

export async function POST(req: NextRequest) {
  const data = await req.json();

  const intent = await createPaymentIntent(
    data.price,
    data.email,
    data.orderItems
  );
  return Response.json({ client_secret: intent.client_secret });
}
