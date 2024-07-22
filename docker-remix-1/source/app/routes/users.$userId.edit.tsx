import React from "react";
import { Form, useLoaderData, useMatches } from "@remix-run/react";

import { usersSingleLoader } from "../.server/loaders/users.single.loader";
import { userEditAction } from "../.server/actions/users.edit.action";

export const action = userEditAction;

export const loader = usersSingleLoader;

export default function EditUser() {
  const { user } = useLoaderData<typeof loader>();

  console.log(useMatches());

  return (
    <Form key={user.id} method="post" className="p-4 flex flex-col gap-4">
      <div className="flex gap-2 items-center">
        <span>Name</span>
        <input
          defaultValue={user.firstName}
          name="firstName"
          type="text"
          placeholder="First name"
        />
        <input
          defaultValue={user.lastName}
          name="lastName"
          placeholder="Last name"
          type="text"
        />
      </div>

      <label className="space-x-2">
        <span>Email</span>
        <input defaultValue={user.email} name="email" type="text" />
      </label>

      <label className="space-x-2">
        <span>Avatar URL</span>
        <input
          defaultValue={user.image}
          name="image"
          placeholder="https://example.com/avatar.jpg"
          type="text"
        />
      </label>

      <div className="space-x-4">
        <button type="submit">Save</button>
        <button type="button">Cancel</button>
      </div>
    </Form>
  );
}
