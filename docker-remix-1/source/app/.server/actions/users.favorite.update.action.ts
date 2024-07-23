import { ActionFunctionArgs } from "@remix-run/node";
import { updateUser } from "../data/dummyjson";
import invariant from "tiny-invariant";

export const updateUserFavoriteAction = async ({
  request,
  params,
}: ActionFunctionArgs) => {
  invariant(params.userId, "Missing userId param");
  const formData = await request.formData();
  const favorite = formData.get("favorite") === "true";

  return await updateUser(parseInt(params.userId), { favorite });
};
