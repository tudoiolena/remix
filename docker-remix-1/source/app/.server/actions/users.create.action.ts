import { redirect } from "@remix-run/react";
import { prisma } from "../../utils/prisma.server";
// import { createEmptyUser } from "../data/dummyjson";

// export const userCreateAction = async () => {
//   const user = await createEmptyUser();
//   return redirect(`/users/${user.id}/edit`);
// };

export const userCreateAction = async () => {
  const user = await prisma.user.create({
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
