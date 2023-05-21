import { PrismaClient } from "@prisma/client";
import protectRoute from "~~/server/utils/protectRoute";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  protectRoute(event);

  // Get user email from the supabase user if there is one.
  const {
    user: { email: userEmail },
  } = event.context;

  const videosPurchase = await prisma.videoPurchase.findMany({
    where: {
      userEmail,
    },
    select: {
      videoId: true,
      id: true,
      createdAt: true,
      creditUsed: true,
    },
  });

  if (!videosPurchase) {
  }

  return videosPurchase;
});
