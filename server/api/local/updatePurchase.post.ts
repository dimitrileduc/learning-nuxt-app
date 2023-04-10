import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const { email, amount, verified, stripeId } = await readBody(event);
  console.log(email, amount, verified, stripeId);
  try {
    await prisma.creditPurchase.create({
      data: {
        userEmail: email,
        amount,
        verified,
        stripeId,
      },
    });

    return {
      statusCode: 200,
      body: {
        message: "Credit purchase created successfully",
      },
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: {
        error: "Error creating credit purchase",
      },
    };
  }
});
