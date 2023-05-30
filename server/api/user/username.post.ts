import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function defineEventHandler(event: any) {
  const { email, username } = await readBody(event);

  console.log("user create endpoint called ", email, username);

  try {
    const createdUser = await prisma.userData.create({
      data: {
        userEmail: email,
        username,
        name: "",
        firstName: "",
        country: "",
        phone: "",
      },
    });

    return {
      statusCode: 200,
      body: {
        message: "User created successfully",
        user: createdUser,
      },
    };
  } catch (error) {
    console.log("Error creating user:", error);
    return {
      statusCode: 500,
      body: {
        error: "Failed to create user",
      },
    };
  }
});
