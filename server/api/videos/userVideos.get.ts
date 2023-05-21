import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const userEmail = event.context.user?.email;

  // Get the all videos based on the `videoUpdated` field
  const videos = await prisma.video.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  // user not logged in , return placeholder images and video infos without link
  if (!userEmail) {
    return null;
  } else {
    // Check if the user has purchased each video
    const videoPurchases = await prisma.videoPurchase.findMany({
      where: {
        userEmail,
        videoId: { in: videos.map((video) => video.id) },
      },
      select: {
        videoId: true,
      },
    });

    return videoPurchases;
  }
});
