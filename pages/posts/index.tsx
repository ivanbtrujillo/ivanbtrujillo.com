import { Layout, Title, PostList } from "components/index";
import { GetStaticProps } from "next";
import { getPostsFromGithub } from "services/posts.service";
import { PostType } from "model/Post";

interface PostProps {
  posts: PostType[];
}

export const Posts = ({ posts }: PostProps) => {
  return (
    <Layout>
      <div className="page">
        <div className="px-4">
          <Title>Posts</Title>
          <PostList posts={posts} />
        </div>
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const posts: PostType[] = await getPostsFromGithub();

  return {
    props: {
      posts,
    },
    revalidate: 1,
  };
};

export default Posts;
