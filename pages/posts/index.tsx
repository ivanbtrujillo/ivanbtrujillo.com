import { Layout, PostDate } from "@components/index";
import { getSortedPostsData } from "../../lib/posts";
import { GetStaticProps } from "next";
import fetch from "node-fetch";
import matter from "gray-matter";
import Link from "next/link";

export default function Home({ posts }) {
  return (
    <Layout title="Blog">
      <div className="page">
        <div className=" px-4 sm:px-6 lg:px-8">
          <h1 className="text-xl font-semibold text-gray-800 mb-4 ">
            Publicaciones
          </h1>
          <div className="grid grid-cols-1 col-gap-4 md:grid-cols-3">
            {posts.map(({ date, title, id, img, summary, as }) => (
              <Link href="/posts/[id]" as={`/posts/${as}`} key={id}>
                <div className="py-4 px-4 hover:bg-gray-300 cursor-pointer">
                  <img
                    src={img}
                    alt={title}
                    className="w-full h-56 object-cover mb-4"
                  />
                  <PostDate dateString={date} />
                  <a href="#" className="block">
                    <h3 className="mt-2 text-xl leading-7 font-semibold text-blue-800">
                      {title}
                    </h3>
                    <p className="mt-3 text-base leading-6 text-gray-800">
                      {summary}
                    </p>
                  </a>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

/*
 * Static generation generates the page with the data at build time
 * Essentially, getStaticProps allows you to tell Next.js: “Hey, this page has some data dependencies
 * — so when you pre-render this page at build time, make sure to resolve them first!”
 */
export const getStaticProps: GetStaticProps = async () => {
  const allPostData = getSortedPostsData();
  const response = await getPostFromGithub();

  const posts = response.map((post) => {
    const matterResult = matter(post.body);
    return {
      id: post.id,
      as: post.title.toLowerCase().replace(" ", "-"),
      title: post.title,
      content: matterResult.content,
      ...matterResult.data,
    };
  });

  return {
    props: {
      posts,
    },
  };
};

const getPostFromGithub = async () => {
  const response = await fetch(
    "https://api.github.com/repos/ivanbtrujillo/next-blog/issues",
    {
      headers: {
        Authorization: `token ${process.env.githubToken}`,
      },
    }
  );
  return response.json();
};
