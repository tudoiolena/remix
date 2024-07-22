import { LoaderFunctionArgs } from "@remix-run/node";
import { prisma } from "../../utils/prisma.server";
// import { searchUsers, getUsers } from "../data/dummyjson";

// export const usersLoader = async ({ request }: LoaderFunctionArgs) => {
//   const url = new URL(request.url);
//   const q = url.searchParams.get("q")?.trim() || "";
//   if (q) {
//     return { users: await searchUsers(q), q };
//   }
//   return { users: await getUsers(), q };
// };

export const usersLoader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const q = url.searchParams.get("q")?.trim() || "";

  const users = await prisma.user.findMany();
  return { users, q };
};
