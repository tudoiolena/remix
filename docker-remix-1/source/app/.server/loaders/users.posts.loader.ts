import { LoaderFunctionArgs } from "@remix-run/node";
// import { getUserPosts } from "../data/dummyjson";
import { db } from "../../../prisma/seed";

// export const usersPostsLoader = async ({ params }: LoaderFunctionArgs) => {
//   if (!params.userId) {
//     throw new Response("Id Not Found", { status: 404 });
//   }
//   const posts = await getUserPosts(params.userId);
//   if (!posts) {
//     throw new Response("Posts Not Found", { status: 404 });
//   }
//   return { posts };
// };

export const usersPostsLoader = async ({ params }: LoaderFunctionArgs) => {
  if (!params.userId) {
    throw new Response("Id Not Found", { status: 404 });
  }

  const posts = await db.post.findMany({
    where: {
      userId: parseInt(params.userId),
    },
    include: {
      reactions: true,
    },
  });

  if (!posts || posts.length === 0) {
    throw new Response("Posts Not Found", { status: 404 });
  }

  return { posts };
};
