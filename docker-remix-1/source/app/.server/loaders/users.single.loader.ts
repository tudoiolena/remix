import { LoaderFunctionArgs } from "@remix-run/node";
// import { getUserById } from "../data/dummyjson";
import { db } from "../../../prisma/seed";

// export const usersSingleLoader = async ({ params }: LoaderFunctionArgs) => {
//   if (!params.userId) {
//     throw new Response("Id Not Found", { status: 404 });
//   }
//   const user = await getUserById(params.userId);
//   if (!user) {
//     throw new Response("User Not Found", { status: 404 });
//   }
//   return { user };
// };

export const usersSingleLoader = async ({ params }: LoaderFunctionArgs) => {
  if (!params.userId) {
    throw new Response("Id Not Found", { status: 404 });
  }

  const user = await db.user.findUnique({
    where: { id: parseInt(params.userId) },
    include: { address: true },
  });

  if (!user) {
    throw new Response("User Not Found", { status: 404 });
  }

  return { user };
};
