import { PrismaClient } from "@prisma/client";
import stripe from "./stripe";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const userEmail = event.context.user?.email;
  const { amount } = await readBody(event);

  // We only have one course for now, so we have the price hard-coded
  let paymentIntent;
  try {
    paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: "eur",

      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        email: userEmail,
      },
    });
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Error creating payment intent",
    });
  }

  // Only return the secret
  return paymentIntent.client_secret;
});
