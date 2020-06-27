import { Layout, Post, Title } from "components/index";
import { GetStaticProps } from "next";
import { getPostsFromGithub } from "services/posts.service";
import matter from "gray-matter";

export const Posts = ({ posts }) => {
  return (
    <Layout title="Posts" canonical="posts">
      <div className="page">
        <div className=" px-4 sm:px-6 lg:px-8">
          <Title>Posts</Title>
          <div className="grid grid-cols-1 col-gap-4 md:grid-cols-3">
            {posts.map(post => (
              <Post key={post.id} {...post} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const data = await getPostsFromGithub();

  const posts = data.map(post => {
    const matterResult = matter(post.body || "");
    return {
      id: post.number,
      title: post.title,
      content: matterResult.content,
      ...matterResult.data,
    };
  });
  return {
    props: {
      posts,
    },
    unstable_revalidate: 1,
  };
};

export default Posts;
