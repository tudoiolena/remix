import { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/react";
import { db } from "../../../prisma/seed";
import { DummyUserPartial } from "../data/dummyjson";
// import { updateUser } from "../data/dummyjson";

// export const userEditAction = async ({
//   params,
//   request,
// }: ActionFunctionArgs) => {
//   if (!params.userId) {
//     throw new Response("Id Not Found", { status: 404 });
//   }
//   const formData = await request.formData();
//   const updates = Object.fromEntries(formData);
//   await updateUser(params.userId, updates);
//   return redirect(`/users/${params.userId}/edit`);
// };

export const userEditAction = async ({
  params,
  request,
}: ActionFunctionArgs) => {
  if (!params.userId) {
    throw new Response("Id Not Found", { status: 404 });
  }

  const formData = await request.formData();
  const updates = Object.fromEntries(formData) as {
    [key: string]: DummyUserPartial;
  };

  await db.user.update({
    where: {
      id: parseInt(params.userId),
    },
    data: updates,
  });

  return redirect(`/users/${params.userId}/edit`);
};
