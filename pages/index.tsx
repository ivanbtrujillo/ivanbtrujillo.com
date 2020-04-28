import { Layout, LinkBtn, PostDate } from "@components/index";
import { getSortedPostsData } from "../lib/posts";
import { GetStaticProps } from "next";
import fetch from "node-fetch";
import Link from "next/link";
import { useEffect } from "react";
import matter from "gray-matter";

const user = {
  name: "Iván",
  lastName: "Trujillo",
};
export default function Home({ posts }) {
  return (
    <Layout title="Ivan Trujillo | Inicio">
      <div className="page">
        <div className="flex flex-col lg:flex-row items-center">
          <img
            src="/images/ivan.png"
            className="w-48 h-48 rounded-full border-4 border-white object-cover"
            alt={user.name}
          />

          <div className="  px-4 sm:px-6  lg:px-8 ">
            <div className="sm:text-center lg:text-left">
              <h2 className="text-2xl tracking-tight leading-10 font-extrabold text-gray-900 sm:text-3xl sm:leading-none md:text-4xl">
                {user.name}
                <br className="xl:hidden" />
                <span className="text-blue-800">{user.lastName}</span>
              </h2>
              <p className="mt-3 text-base text-gray-800 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 lg:mx-0">
                Hola 👋, soy un desarrollador enfocado en Javascript y su
                ecosistema. Me gusta aprender y seguir buenas práticas y
                mantener mi código simple.
              </p>
              <p className="mt-3 text-base text-gray-800 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 lg:mx-0">
                En mi opinión, el mejor código es aquel que es fácil de leer,
                fácil de cambiar y fácil de eliminar.
              </p>
            </div>
          </div>
        </div>
        <div className=" mt-10 pt-4  border-t border-gray-300 ">
          <div className="flex flex-col ">
            <div className="flex flex-col items-center flex-1 mx-4">
              <div className="mb-8">
                <h1 className="text-xl font-semibold text-gray-800 ">
                  Ultimos artículos que he publicado
                </h1>
                <div className="grid gridl-cols-1 col-gap-4 md:grid-cols-3">
                  {posts.map(({ date, title, id, img, summary }) => (
                    <Link href="/posts/[id]" as={`/posts/${id}`} key={id}>
                      <div className=" py-4 px-4 hover:bg-gray-400 cursor-pointer">
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
              <LinkBtn href="/posts">Ver mas artículos</LinkBtn>
            </div>
            <div className=" flex-1 mx-4 ">
              <h1 className="text-xl mt-8 font-semibold text-gray-800 mb-8">
                Me gusta trabajar con
              </h1>
              <div className="flex flex-row flex-wrap">
                <img
                  alt="javascript"
                  className="h-24 w-24 mr-2 mb-2"
                  src="/images/javascript.svg.png"
                />
                <img
                  alt="typescript"
                  className="h-24 w-24  mr-2 mb-2"
                  src="/images/typescript.svg"
                />
                <img
                  alt="jnext"
                  className="h-24 w-24 bg-black mr-2 mb-2"
                  src="/images/next.png"
                />
                <img
                  alt="react"
                  className="h-24 w-24 bg-black  mr-2 mb-2 p-2"
                  src="/images/react.png"
                />
                <img
                  alt="tailwind"
                  className="h-24 w-24 bg-black  mr-2 mb-2"
                  src="/images/tailwind.png"
                />
                <img
                  alt="node"
                  className="h-24 w-24 bg-black  mr-2 mb-2 p-2"
                  src="/images/node.svg"
                />
                <img
                  alt="firestore"
                  className="h-24 w-24 bg-black  mr-2 mb-2"
                  src="/images/firestore.png"
                />
                <img
                  alt="jest"
                  className="h-24 w-24 bg-black  mr-2 mb-2"
                  src="/images/jest.png"
                />
              </div>
            </div>
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
  const response = await getPostFromGithub();

  const posts = response.map((post) => {
    const matterResult = matter(post.body);
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

// curl -H "Authorization: token 9ac344d846d37cbd642e0b83be8562ba1aba9c32" https://api.github.com/repos/ivanbtrujillo/next-blog/issues
