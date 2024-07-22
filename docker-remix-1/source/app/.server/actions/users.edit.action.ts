import { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/react";
import { DummyUserPartial } from "../data/dummyjson";
import { updateUser } from "../data/dummyjson/users";

export const userEditAction = async ({
  params,
  request,
}: ActionFunctionArgs) => {
  if (!params.userId) {
    throw new Response("Id Not Found", { status: 404 });
  }

  const formData = await request.formData();
  const updates = Object.fromEntries(formData) as Record<
    string,
    DummyUserPartial
  >;

  await updateUser(parseInt(params.userId), updates);

  return redirect(`/users/${params.userId}/edit`);
};
