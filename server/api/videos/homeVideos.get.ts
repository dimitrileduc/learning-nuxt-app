import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const userEmail = event.context.user?.email;

  // Get the last 2 videos based on the `videoUpdated` field
  const videos = await prisma.video.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 2,
  });

  // user not logged in , return placeholder images and video infos without link
  if (!userEmail) {
    return [
      {
        logged: false,
        title: videos[0].title,
        description: videos[0].description,
        access: false,
        thumbnailUrl:
          "https://png.pngtree.com/png-vector/20210604/ourmid/pngtree-gray-network-placeholder-png-image_3416659.jpg",
      },
      {
        logged: false,
        title: videos[1].title,
        description: videos[1].description,
        access: false,
        thumbnailUrl:
          "https://png.pngtree.com/png-vector/20210604/ourmid/pngtree-gray-network-placeholder-png-image_3416659.jpg",
      },
    ];
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

      return {
        id: video.id,
        logged: true,
        title: video.title,
        description: video.description,
        access: isVideoPurchased,
        thumbnailUrl: isVideoPurchased
          ? null
          : "https://png.pngtree.com/png-vector/20210604/ourmid/pngtree-gray-network-placeholder-png-image_3416659.jpg",
        videoUrl: isVideoPurchased ? video.url : null,
      };
    });

    return isPurchased;
  }
});
