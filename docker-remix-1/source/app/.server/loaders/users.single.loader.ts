import { LoaderFunctionArgs } from "@remix-run/node";
import { prisma } from "../../utils/prisma.server";
// import { getUserById } from "../data/dummyjson";

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

  const user = await prisma.user.findUnique({
    where: { id: parseInt(params.userId) },
    include: { address: true },
  });

  if (!user) {
    throw new Response("User Not Found", { status: 404 });
  }

  return { user };
};
