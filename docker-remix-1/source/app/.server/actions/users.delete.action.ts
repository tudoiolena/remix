import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { deleteUser } from "../data/dummyjson/users";

export const userDeleteAction = async ({ params }: ActionFunctionArgs) => {
  if (!params.userId) {
    throw new Response("Id Not Found", { status: 404 });
  }

  await deleteUser(parseInt(params.userId));

  return redirect("/");
};
