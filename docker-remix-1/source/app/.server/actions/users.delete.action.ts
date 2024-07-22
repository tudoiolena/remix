import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { deleteUser } from "../data/dummyjson";
import invariant from "tiny-invariant";

export const userDeleteAction = async ({ params }: ActionFunctionArgs) => {
  invariant(params.userId, "Missing userId param");

  await deleteUser(parseInt(params.userId));

  return redirect("/");
};
