import { prisma } from "../../../utils/prisma.server";

export async function getUserPosts(userId: number) {
  return await prisma.post.findMany({
    where: {
      userId: userId,
    },
    include: {
      reactions: true,
    },
  });
}
