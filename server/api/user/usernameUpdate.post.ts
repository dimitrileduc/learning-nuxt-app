import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function defineEventHandler(event: any) {
  const userEmail = event.context.user?.email;
  const username = await readBody(event);

  try {
    const createdUser = await prisma.userData.update({
      data: {
        username,
      },
      where: {
        userEmail: userEmail,
      },
    });
    return createdUser;
  } catch (error) {
    console.log("Error creating user:", error);
    return error;
  }
}
