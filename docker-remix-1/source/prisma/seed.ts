import { PrismaClient } from "@prisma/client";
import fetch from "node-fetch";
import {
  DummyPost,
  DummyUser,
  getUrl,
  LIMIT_NUMBER,
} from "../app/.server/data/dummyjson";

const db = new PrismaClient();
export { db };

export async function fetchDummyData(): Promise<DummyUser[]> {
  let allUsers: DummyUser[] = [];
  let chunk = 0;
  let moreUsers = true;

  while (moreUsers) {
    const response = await fetch(
      getUrl(`/users?limit=${LIMIT_NUMBER}&skip=${chunk * LIMIT_NUMBER}`)
    );
    const data = (await response.json()) as { users: DummyUser[] };

    if (data.users.length === 0) {
      moreUsers = false;
    }

    allUsers = allUsers.concat(data.users);
    chunk++;
  }

  return allUsers;
}

export async function getUserPosts(id: string): Promise<DummyPost[]> {
  let allPosts: DummyPost[] = [];
  let chunk = 0;
  let morePosts = true;

  while (morePosts) {
    const response = await fetch(
      getUrl(
        `/users/${id}/posts?limit=${LIMIT_NUMBER}&skip=${chunk * LIMIT_NUMBER}`
      )
    );
    const data = (await response.json()) as { posts: DummyPost[] };

    if (data.posts.length === 0) {
      morePosts = false;
    }

    allPosts = allPosts.concat(data.posts);
    chunk++;
  }
  return allPosts;
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
