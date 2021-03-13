type PostType = {
  id: string;
  userId: string;
  title: string;
  body: string;
  likeCount: number;
  createdAt: string;
  updatedAt: string;
  user: UserType;
  tags: TagType[];
};

type UserType = {
  id: string;
  name: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
  postCount?: number;
  profile: ProfileType;
};

type ProfileType = {
  id: string;
  image: string;
  description?: string;
};

type TagType = {
  id: string;
  name: string;
  postCount: number;
  createdAt: string;
  updatedAt: string;
  posts: PostType[];
};

type LikeType = {
  userId: string;
  postId: string;
};

type AccessUserType = {
  id: string;
  name: string;
  email: string;
  image: string;
};
