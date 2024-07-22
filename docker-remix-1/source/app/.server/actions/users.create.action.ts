import { redirect } from "@remix-run/react";
// import { createEmptyUser } from "../data/dummyjson";
import { db } from "../../../prisma/seed";

// export const userCreateAction = async () => {
//   const user = await createEmptyUser();
//   return redirect(`/users/${user.id}/edit`);
// };

export const userCreateAction = async () => {
  const user = await db.user.create({
    data: {
      firstName: "",
      lastName: "",
      age: 0,
      image: "",
      favorite: false,
      email: ``,
      address: {
        create: {
          country: "",
          city: "",
          address: "",
        },
      },
    },
  });

  return redirect(`/users/${user.id}/edit`);
};
