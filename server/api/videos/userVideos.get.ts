import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function defineEventHandler(event: any) {
  const userEmail = event.context.user?.email;

  let videoPurchases: any = [];////

  // if (userEmail) {
  //   videoPurchases = await prisma.videoPurchase.findMany({
  //     where: {
  //       userEmail,
  //     },
  //     select: {
  //       videoId: true,
  //     },
  //   });

  //   const videoIds = videoPurchases.map((video: any) => video.videoId);

  //   const videos = await prisma.video.findMany({
  //     where: {
  //       id: { in: videoIds },
  //     },
  //   });

  //   const videosBySign = await prisma.videoBySigns.findMany({
  //     where: {
  //       id: { in: videoIds },
  //     },
  //   });

  //   const allVideos = [...videos, ...videosBySign];

  //   return allVideos;
  // } else {
    return null;
  // }
}
