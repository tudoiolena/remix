import { PrismaClient } from "@prisma/client";
import fetch from "node-fetch";
import { DummyPost, DummyUser, getUrl } from "../app/.server/data/dummyjson";

const db = new PrismaClient();
export { db };
export async function fetchDummyData(): Promise<DummyUser[]> {
  const response = await fetch(getUrl(`/users`));
  const data = (await response.json()) as { users: DummyUser[] };
  return data.users;
}

export async function getUserPosts(id: string): Promise<DummyPost[]> {
  const response = await fetch(getUrl(`/users/${id}/posts`));
  const data = (await response.json()) as { posts: DummyPost[] };
  return data.posts;
}

async function main() {
  const users = await fetchDummyData();

  for (const user of users) {
    const userPosts = await getUserPosts(user.id.toString());

    await db.user.create({
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
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
