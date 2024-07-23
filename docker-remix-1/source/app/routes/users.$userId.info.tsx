// import React from "react";
import {
  useFetcher,
  useNavigation,
  useRouteLoaderData,
} from "@remix-run/react";
import { usersSingleLoader } from "../.server/loaders/users.single.loader";
import { updateUserFavoriteAction } from "../.server/actions/users.favorite.update.action";
import { FunctionComponent } from "react";

export const action = updateUserFavoriteAction;

export default function UserInfo() {
  const routeData = useRouteLoaderData<typeof usersSingleLoader>(
    "routes/users.$userId"
  );

  const { state } = useNavigation();

  if (!routeData) {
    return null;
  }
  const { user } = routeData;

  return (
    <div className="flex flex-col gap-4 items-center">
      {state === "loading" ? (
        <div className="spinner size-20"></div>
      ) : (
        <div className="flex gap-4 items-center">
          <img src={user.image} alt="user" className="size-32" />
          <div>
            <div className="text-2xl flex items-center gap-2">
              {user.firstName} {user.lastName},{" "}
              <span className="text-gray-600">age {user.age}</span>
              <Favorite userId={user.id} isFavorite={user.favorite} />
            </div>
            <div>{user.address?.country}</div>
            <div>
              {user.address?.city}, {user.address?.address}
            </div>
            <div>Email: {user.email}</div>
          </div>
        </div>
      )}
    </div>
  );
}

type FavoriteProps = {
  userId: number;
  isFavorite: boolean;
};

const Favorite: FunctionComponent<FavoriteProps> = ({ isFavorite }) => {
  const fetcher = useFetcher();
  const favorite = fetcher.formData
    ? fetcher.formData.get("favorite") === "true"
    : isFavorite;

  return (
    <fetcher.Form method="post">
      <button
        aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
        name="favorite"
        value={favorite ? "false" : "true"}
        className={`bg-none border-none cursor-pointer ${
          favorite ? "text-yellow-500" : "text-black"
        }`}
      >
        {favorite ? "★" : "☆"}
      </button>
    </fetcher.Form>
  );
};
