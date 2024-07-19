import { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/react";
import { updateUser } from "../data/dummyjson";

export const userEditAction = async ({
  params,
  request,
}: ActionFunctionArgs) => {
  if (!params.userId) {
    throw new Response("Id Not Found", { status: 404 });
  }
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  await updateUser(params.userId, updates);
  return redirect(`/users/${params.userId}/edit`);
};
