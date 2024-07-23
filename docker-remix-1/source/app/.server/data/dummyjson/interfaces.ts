import { Prisma } from "@prisma/client";

export type UserAddress = {
  country: string;
  city: string;
  address: string;
};

export type UserReaction = {
  likes: number;
  dislikes: number;
};

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  image: string;
  email: string;
  favorite: boolean;
  address: UserAddress;
  posts: Post[];
};

export type UserPartial = Partial<Omit<Prisma.UserUpdateInput, "id">>;

export type Post = {
  id: number;
  title: string;
  body: string;
  userId: number;
  tags: string[];
  reactions: UserReaction;
};
