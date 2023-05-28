import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const { amount, verified, stripeId } = await readBody(event);
  const userEmail = event.context.user?.email;
  console.log(
    "credit purchase endpoint called ",
    userEmail,
    amount,
    verified,
    stripeId
  );

  try {
    await prisma.creditPurchase.create({
      data: {
        userEmail: userEmail,
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
    console.log("tricky", error);
    return {
      statusCode: 500,
      body: {
        error: error,
      },
    };
  }
});
