import { LoaderFunctionArgs } from "@remix-run/node";
import { getUserPosts } from "../data/dummyjson";
import invariant from "tiny-invariant";

export const usersPostsLoader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.userId, "Missing contactId param");

  const posts = await getUserPosts(parseInt(params.userId));

  if (!posts || posts.length === 0) {
    throw new Response("Posts Not Found", { status: 404 });
  }

  return { posts };
};
