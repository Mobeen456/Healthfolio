import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Retrieves a user from the database by email.
 * 
 * @param email - The email of the user to retrieve.
 * @returns A user object if found, otherwise null.
 */
export async function getUserFromDb(email: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    return user;
  } catch (error) {
    console.error("Error retrieving user from database:", error);
    return null;
  }
}
