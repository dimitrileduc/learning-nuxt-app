import { Vimeo } from "vimeo";
import { PrismaClient } from "@prisma/client";

const client = new Vimeo(
  "6151b4d672170573111c19f5d6bab685",
  "dLdYm0rptQLuFV+PDZntKZ5+JCDSAIxBVG2xSIL+RTYNAqZwjSv4sueK/zWxOi954dnbb+U67JI5dYm4aCturKwlT25N3Ax+f5pcBAUllh199H68opNM4HRxi0vZc1is",
  "7fcf03d6252e3805530064e105c64382"
);

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  return new Promise((resolve, reject) => {
    client.request(
      {
        method: "GET",
        path: "/me/projects/17943764/items",
      },
      async function (error, body, status_code, headers) {
        if (error) {
          console.log(error);
          reject(error);
          return;
        }

        const videos = body.data; // Assuming the videos are stored in the 'data' property

        // Sort videos by creation date in descending order
        videos.sort(
          (a, b) => new Date(b.created_time) - new Date(a.created_time)
        );

        console.log("videos from videos by signs in endpoint sync", videos);

        // Retrieve the last two videos
        const lastTwoVideos = videos.slice(0, 2);

        try {
          // Create an array to store the promises
          const promises = lastTwoVideos.map(addVideoToDatabase);

          // Wait for all promises to resolve
          await Promise.all(promises);

          console.log("All videos added to the database by signs duo");

          resolve({
            statusCode: 200,
            body: { message: "Videos added to the database" },
          });
        } catch (error) {
          console.log("Error:", error);
          reject(error);
        }
      }
    );
  });
});

async function addVideoToDatabase(video) {
  try {
    const existingVideo = await prisma.videoBySigns.findMany({
      where: { url: video.video.link },
    });

    if (existingVideo.length > 0) {
      console.log("Video with the same URL already exists");
      console.log("existing video", existingVideo);

      // Update the title and description of the existing video
      await prisma.videoBySigns.update({
        where: { url: video.video.link },
        data: {
          title: video.video.name || existingVideo.title,
          description: video.video.description || existingVideo.description,
          tag: video.video.tags[0].tag || existingVideo.tags[0].tag,
        },
      });

      console.log(
        `Video '${video.video.name}' updated in the database by signs`
      );
      return;
    }

    await prisma.videoBySigns.create({
      data: {
        title: video.video.name || "",
        description: video.video.description || "",
        url: video.video.link || "",
        thumbnail: video.video.pictures?.base_link || "",
        tag: video.video?.tags[0].tag || "",
      },
    });

    console.log(`Video '${video.video.name}' added to the database`);
  } catch (error) {
    console.log("add video error", error);
    throw error;
  }
}
