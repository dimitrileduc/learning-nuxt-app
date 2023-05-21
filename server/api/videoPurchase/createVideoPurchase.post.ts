import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const userEmail = event.context.user?.email;
  const { videoID, creditAmount } = await readBody(event);

  try {
    await prisma.videoPurchase.create({
      data: {
        userEmail,
        videoId: videoID,
        creditUsed: creditAmount,
      },
    });

    return {
      statusCode: 200,
      body: {
        message: "Video purchase created successfully",
      },
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: {
        error: "Error creating video purchase",
      },
    };
  }
});
