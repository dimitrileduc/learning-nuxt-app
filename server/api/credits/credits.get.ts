import { PrismaClient } from "@prisma/client";
import protectRoute from "~~/server/utils/protectRoute";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  console.log("credit get endpoint called ");
  //protectRoute(event);

  // Get user email from the supabase user if there is one.
  const {
    user: { email: userEmail },
  } = event.context;

  const balance = await prisma.creditBalance.findFirst({
    where: {
      userEmail,
    },
  });

  if (!balance) {
    console.log("no balance found");
  }

  return balance?.balance;
});
