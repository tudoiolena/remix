import { PrismaClient } from "@prisma/client";
import fetch from "node-fetch";
import { DummyPost, DummyUser, getUrl } from "../app/.server/data/dummyjson";

const prisma = new PrismaClient();

export async function fetchDummyData(): Promise<DummyUser[]> {
  const response = await fetch(getUrl(`/users`));
  const data = (await response.json()) as { users: DummyUser[] };
  return data.users;
}

export async function getUserPosts(id: string): Promise<DummyPost[]> {
  const response = await fetch(getUrl(`/users/${id}/posts`));
  const data = (await response.json()) as { posts: DummyPost[] };
  // const { posts } = await res.json();
  return data.posts;
}

async function main() {
  const users = await fetchDummyData();

  for (const user of users) {
    const userPosts = await getUserPosts(user.id.toString());

    const createdUser = await prisma.user.create({
      data: {
        firstName: user.firstName,
        lastName: user.lastName,
        age: user.age,
        image: user.image,
        email: user.email,
        favorite: false,
        address: {
          create: {
            country: user.address.country,
            city: user.address.city,
            address: user.address.address,
          },
        },
        posts: {
          create: userPosts.map((post: DummyPost) => ({
            title: post.title,
            body: post.body,
            tags: post.tags,
            reactions: {
              create: {
                likes: post.reactions.likes,
                dislikes: post.reactions.dislikes,
              },
            },
          })),
        },
      },
    });
    console.log(`Created user with id: ${createdUser.id}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
