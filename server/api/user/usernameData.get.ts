import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function defineEventHandler(event: any) {
  const userEmail = event.context.user?.email;

  if (userEmail) {
    const usernameData = await prisma.userData.findUnique({
      where: {
        userEmail,
      },
      select: {
        username: true,
      },
    });

    const username = usernameData?.username;

    return username;
  } else {
    return null;
  }
}
