import { PrismaClient } from "@prisma/client";
import protectRoute from "~~/server/utils/protectRoute";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  console.log("user  videos get endpoint called ");

  protectRoute(event);

  console.log("user videos get - ok user logged ");

  const userEmail = event.context.user?.email;

  if (!userEmail) {
    return null;
  }

  // Get all VideoPurchase records for the user
  const videoPurchases = await prisma.videoPurchase.findMany({
    where: {
      userEmail,
    },
  });

  if (!videoPurchases.length) {
    return null;
  }

  // Map the videoIds from the VideoPurchase records
  const videoIds = videoPurchases.map((vp) => vp.videoId);

  // Get all videos that correspond to the videoIds
  const videos = await prisma.video.findMany({
    where: {
      id: {
        in: videoIds,
      },
    },
  });

  return videos;
});
