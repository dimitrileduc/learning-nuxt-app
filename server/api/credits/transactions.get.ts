import { PrismaClient } from "@prisma/client";
import protectRoute from "~~/server/utils/protectRoute";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  console.log("credit transactions get endpoint called ");
  protectRoute(event);

  // Get user email from the supabase user if there is one.
  const {
    user: { email: userEmail },
  } = event.context;

  console.log(userEmail, "context");
  const creditsPurchase = await prisma.creditPurchase.findMany({
    where: {
      userEmail,
    },
  });

  if (!creditsPurchase) {
    console.log("no credits transactions found");
  }

  return creditsPurchase;
});
