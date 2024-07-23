import { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/react";
import invariant from "tiny-invariant";
import { UserPartial, updateUser } from "../data/dummyjson";

export const userEditAction = async ({
  params,
  request,
}: ActionFunctionArgs) => {
  invariant(params.userId, "Missing userId param");

  const formData = await request.formData();
  const updates = Object.fromEntries(formData) as Record<string, UserPartial>;

  await updateUser(parseInt(params.userId), updates);

  return redirect(`/users/${params.userId}/info`);
};
