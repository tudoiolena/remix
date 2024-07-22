import type { DummyUserPartial } from "./interfaces";
import { prisma } from "../../../utils/prisma.server";

export async function searchUsers(query: string) {
  const users = await prisma.user.findMany({
    where: {
      OR: [
        {
          firstName: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          lastName: {
            contains: query,
            mode: "insensitive",
          },
        },
      ],
    },
  });
  return users;
}

export async function createEmptyUser() {
  return await prisma.user.create({
    data: {
      firstName: "",
      lastName: "",
      age: 0,
      image: "",
      favorite: false,
      email: "",
      address: {
        create: {
          country: "",
          city: "",
          address: "",
        },
      },
    },
  });
}

export async function getUsers() {
  return await prisma.user.findMany();
}

export async function getUserById(userId: number) {
  return await prisma.user.findUnique({
    where: { id: userId },
    include: { address: true },
  });
}

export async function deleteUser(userId: number) {
  return await prisma.user.delete({
    where: {
      id: userId,
    },
  });
}

export async function updateUser(
  userId: number,
  updates: Record<string, DummyUserPartial>
) {
  return await prisma.user.update({
    where: {
      id: userId,
    },
    data: updates,
  });
}
