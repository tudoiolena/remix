import { LoaderFunctionArgs } from "@remix-run/node";
import { getUserPosts } from "../data/dummyjson/posts";

export const usersPostsLoader = async ({ params }: LoaderFunctionArgs) => {
  if (!params.userId) {
    throw new Response("Id Not Found", { status: 404 });
  }

  const posts = await getUserPosts(parseInt(params.userId));

  if (!posts || posts.length === 0) {
    throw new Response("Posts Not Found", { status: 404 });
  }

  return { posts };
};
