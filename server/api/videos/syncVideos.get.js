// api/vimeo.js

import { Vimeo } from "vimeo";

const client = new Vimeo(
  "6151b4d672170573111c19f5d6bab685",
  "dLdYm0rptQLuFV+PDZntKZ5+JCDSAIxBVG2xSIL+RTYNAqZwjSv4sueK/zWxOi954dnbb+U67JI5dYm4aCturKwlT25N3Ax+f5pcBAUllh199H68opNM4HRxi0vZc1is",
  "7fcf03d6252e3805530064e105c64382"
);

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  // Make requests to the Vimeo API using the client
  client.request(
    {
      method: "GET",
      path: "/me/projects/16472790/items",
    },
    function (error, body, status_code, headers) {
      if (error) {
        console.log(error);
        return error;
      }

      const videos = body.data; // Assuming the videos are stored in the 'data' property

      // Sort videos by creation date in descending order
      videos.sort(
        (a, b) => new Date(b.created_time) - new Date(a.created_time)
      );

      // Retrieve the last two videos
      const lastTwoVideos = videos.slice(0, 2);

      // Iterate through each video and log its details
      lastTwoVideos.forEach((video) => {
        addVideoToDatabase(video);
        console.log(video);
      });

      return body;
    }
  );
});

async function addVideoToDatabase(video) {
  console.log("VIDEOOOOOOOOOOO", video.video);
  try {
    const existingVideos = await prisma.video.findMany({
      where: {
        url: video.link,
      },
    });

    if (existingVideos.length > 0) {
      console.log("Video with the same URL already exists");
      return {
        statusCode: 200,
        body: {
          message: "Video already exists",
        },
      };
    }

    await prisma.video.create({
      data: {
        title: video.name ?? "",
        description: video.description ?? "",
        url: video.link ?? "",
        thumbnail: video?.pictures?.base_link ?? "",
      },
    });
    console.log("Video added to database");
    return {
      statusCode: 200,
      body: {
        message: "Video added to database",
      },
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: {
        error: error,
      },
    };
  }
}
