export type DummyUserAddress = {
  country: string;
  city: string;
  address: string;
};

export type DummyUserReaction = {
  likes: number;
  dislikes: number;
};

export type DummyUser = {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  image: string;
  email: string;
  favorite: boolean;
  address: DummyUserAddress;
};

export type DummyUserPartial = Omit<Partial<DummyUser>, "id">;

export type DummyPost = {
  id: number;
  title: string;
  body: string;
  userId: number;
  tags: string[];
  reactions: DummyUserReaction;
};
