import { Post } from "./Post/Post";
import { PostType } from "model/Post";

export const PostList = ({ posts }: { posts: PostType[] }) => (
  <div className="grid grid-cols-1 col-gap-4 row-gap-4 md:grid-cols-3">
    {posts.map(post => (
      <Post key={post.id} {...post} />
    ))}
  </div>
);
