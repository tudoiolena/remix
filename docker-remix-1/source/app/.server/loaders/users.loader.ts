import { LoaderFunctionArgs } from "@remix-run/node";
import { getUsers, searchUsers } from "../data/dummyjson";

export const usersLoader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const q = url.searchParams.get("q")?.trim() || "";

  if (q) {
    return { users: await searchUsers(q), q };
  }
  return { users: await getUsers(), q };
};
