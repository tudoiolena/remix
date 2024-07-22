import { LoaderFunctionArgs } from "@remix-run/node";
// import { searchUsers, getUsers } from "../data/dummyjson";
import { db } from "../../../prisma/seed";

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

  const users = await db.user.findMany();
  return { users, q };
};
