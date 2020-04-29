import { Layout, Post, Title } from "components/index";
import { GetStaticProps } from "next";
import { getPostsFromGithub } from "services/posts.service";

export const Posts = ({ posts }) => {
  return (
    <Layout title="Posts">
      <div className="page">
        <div className=" px-4 sm:px-6 lg:px-8">
          <Title>Posts</Title>
          <div className="grid grid-cols-1 col-gap-4 md:grid-cols-3">
            {posts.map((post) => (
              <Post {...post} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getPostsFromGithub();
  return {
    props: {
      posts,
    },
  };
};

export default Posts;
