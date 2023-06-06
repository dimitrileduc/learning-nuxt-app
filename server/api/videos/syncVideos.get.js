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

      // Iterate through each video and log its details
      videos.forEach((video) => {
        console.log("Video:", video.video);
      });

      return body;
    }
  );
});
