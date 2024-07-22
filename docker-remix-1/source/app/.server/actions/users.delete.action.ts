import { ActionFunctionArgs, redirect } from "@remix-run/node";
// import { deleteUser } from "../data/dummyjson";
import { db } from "../../../prisma/seed";

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

  await db.user.delete({
    where: {
      id: parseInt(params.userId),
    },
  });

  return redirect("/");
};
