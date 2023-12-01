import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const userEmail = event.context.user?.email;

  // Get the last 2 videos based on the `videoUpdated` field
  const videos = await prisma.videoBySigns.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 12,
  });

  // user not logged in , return placeholder images and video infos without link
  if (!userEmail) {
    const notLoggedVideos = videos.map((video) => {
      return {
        id: video.id,
        logged: false,
        title: video.title,
        description: video.description,
        access: false,
        thumbnailUrl: video.thumbnail,
        videoUrl: null,
        tag: video.tag,
      };
    });
    return notLoggedVideos;
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

    const purchasedVideoIds = videoPurchases.map(
      (videoPurchase) => videoPurchase.videoId
    );

    // Map the videos to an array of objects with the correct access and URLs
    const isPurchased = videos.map((video) => {
      const isVideoPurchased = purchasedVideoIds.includes(video.id);
      console.log(video?.url);

      return {
        id: video.id,
        logged: true,
        title: video.title,
        description: video.description,
        access: isVideoPurchased,
        thumbnailUrl: video.thumbnail,
        videoUrl: isVideoPurchased ? video.url : null,
        tag: video.tag,
      };
    });

    return isPurchased;
  }
});
