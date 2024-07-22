import { LoaderFunctionArgs } from "@remix-run/node";
import { getUserById } from "../data/dummyjson";
import invariant from "tiny-invariant";

export const usersSingleLoader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.userId, "Missing contactId param");
  const user = await getUserById(parseInt(params.userId));

  if (!user) {
    throw new Response("User Not Found", { status: 404 });
  }

  return { user };
};
