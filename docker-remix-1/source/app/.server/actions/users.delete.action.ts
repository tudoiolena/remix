import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { prisma } from "../../utils/prisma.server";
// import { deleteUser } from "../data/dummyjson";

// export const userDeleteAction = async ({ params }: ActionFunctionArgs) => {
//   if (!params.userId) {
//     throw new Response("Id Not Found", { status: 404 });
//   }
//   await deleteUser(params.userId);
//   return redirect("/");
// };

export const userDeleteAction = async ({ params }: ActionFunctionArgs) => {
  if (!params.userId) {
    throw new Response("Id Not Found", { status: 404 });
  }

  await prisma.user.delete({
    where: {
      id: parseInt(params.userId),
    },
  });

  return redirect("/");
};
