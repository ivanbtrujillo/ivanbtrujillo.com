import { Layout, PostDate, CodeBlock, MarkdownEditor } from "@components/index";
import { getAllPostIds, getPostData } from "../../lib/posts";
import ReactMarkdown from "react-markdown";
import fetch from "node-fetch";
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from "next";
import matter from "gray-matter";
import { useState } from "react";

import { useRouter } from "next/router";
import { useAuth } from "use-auth0-hooks";

export default function Post({ postData }) {
  const { isAuthenticated, isLoading, login, logout, user } = useAuth();
  const { pathname, query, asPath } = useRouter();

  const date = new Date().toISOString();
  const [comment, setComment] = useState("");
  const [post, setPost] = useState(postData);

  const saveComment = async (comment) => {
    const commentWithMetadata = `---
date: "${date}"
user: "${user.name}"
userPicture: "${user.picture}"
---

${comment}
    `;

    try {
      const result = await fetch(
        `https://api.github.com/repos/ivanbtrujillo/next-blog/issues/${postData.id}/comments`,
        {
          method: "POST",
          headers: {
            Authorization: `token ${process.env.githubToken}`,
          },
          body: JSON.stringify({
            body: commentWithMetadata,
          }),
        }
      );
      console.log("Comentario guardado correctamente", result);
      await fetch(
        `https://api.zeit.co/v1/integrations/deploy/QmV4UD3oa7bQmDAgD5sXQ9wTd1C4ykkNzmjHecvKzMyx3g/PCLFEpifPC`,
        {
          method: "POST",
        }
      );

      const nextPostComments = [...postData.comments];
      nextPostComments.push({
        date,
        user: user.name,
        userPicture: user.picture,
        content: comment,
      });

      setPost({ ...post, comments: nextPostComments });
    } catch (err) {
      console.error("Error al guardar comentario");
    }
  };

  function submitComment(event) {
    event.preventDefault();
    saveComment(comment);
  }

  return (
    <Layout title={post.title}>
      <div className="bg-gray-50">
        <div className="max-w-screen-xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto"></div>
          <h2 className=" text-3xl leading-9 font-extrabold text-gray-900 sm:text-4xl sm:leading-10">
            {post.title}
          </h2>

          <PostDate dateString={post.date} />

          <ReactMarkdown
            className="markdown mt-8"
            source={post.content}
            renderers={{ code: CodeBlock }}
          />

          {post.comments.length ? (
            <>
              {post.comments.map((comment, index) => (
                <div
                  key={`${comment.id}-${index}`}
                  className="my-8 border border-b border-gray-400 p-4"
                >
                  <div className="flex flex-row">
                    <img
                      src={comment.userPicture}
                      className="w-8 h-8 mr-4 rounded-full"
                    />

                    <span className="leading-9 font-extrabold text-gray-900">
                      {comment.user}
                    </span>
                  </div>
                  <PostDate dateString={comment.date} />

                  {
                    <ReactMarkdown
                      className="markdown mt-2"
                      source={comment.content}
                      renderers={{ code: CodeBlock }}
                    />
                  }
                </div>
              ))}
              <h1 className="text-xl font-semibold text-gray-800 mb-4">
                Envia tu comentario 😜
              </h1>
            </>
          ) : (
            <h1 className="text-xl font-semibold text-gray-800 mb-4">
              Aún no hay comentarios. Sé el primero en opinar! 😎
            </h1>
          )}

          {isLoading && <p> Cargando ...</p>}

          {!isAuthenticated && !isLoading && (
            <div className="flex flex-col">
              <h1 className="text-xl font-semibold text-gray-800 mb-4">
                Debes autenticarte para comentar 🙂
              </h1>
              <button
                className="flex justify-center items-center px-6 py-4 w-48  rounded-sm text-base leading-6 bg-blue-500 text-white hover:bg-blue-400 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150"
                onClick={() =>
                  login({ appState: { returnTo: { pathname: asPath, query } } })
                }
              >
                Login
              </button>
            </div>
          )}

          {!isLoading && isAuthenticated && (
            <div className="flex flex-col">
              <div className="flex flex-row justify-between flex-1  w-full mb-8">
                <div>
                  <img
                    src={user.picture}
                    className="w-24 h-24 mb-4 rounded-full"
                  />
                  <p className="font-semibold text-lg text-blue-600">
                    {user.name}
                  </p>
                </div>
                <div className="flex flex-col justify-end">
                  <button
                    className="flex justify-center items-center px-6 py-4 w-48  rounded-sm text-base leading-6 bg-red-500 text-white hover:bg-red-400 focus:outline-none focus:border-red-300 focus:shadow-outline-red active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150"
                    onClick={() =>
                      logout({
                        appState: { returnTo: { pathname: asPath, query } },
                      })
                    }
                  >
                    Logout
                  </button>
                </div>
              </div>
              <form
                onSubmit={submitComment}
                className="grid grid-cols-1 row-gap-6 sm:grid-cols-2 sm:col-gap-8"
              >
                <div className="sm:col-span-2">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium leading-5 text-gray-700"
                  >
                    Comentario
                  </label>
                  <div style={{ height: "500px" }}>
                    {/* <textarea
                  id="message"
                  rows={4}
                  className="form-textarea py-3 px-4 block w-full border border-gray-500 transition ease-in-out duration-150"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                ></textarea> */}

                    <MarkdownEditor
                      value={comment}
                      renderHTML={(text) => (
                        <ReactMarkdown
                          className="markdown mt-2"
                          source={text}
                          renderers={{ code: CodeBlock }}
                        />
                      )}
                      onChange={(e) => setComment(e.text)}
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <span className="w-full inline-flex rounded-md shadow-sm">
                    <button
                      disabled={user === "" || comment === ""}
                      type="submit"
                      className="w-full inline-flex items-center disabled:opacity-50  justify-center px-6 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition ease-in-out duration-150"
                    >
                      Enviar comentario
                    </button>
                  </span>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getAllPostIds2();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postData = await getPostDetailsFromGithub(params.id as string);
  return {
    props: {
      postData,
    },
  };
};

export const getAllPostIds2 = async () => {
  const response = await getPostsFromGithub();
  const postsIDs = response.map((post) => ({
    params: {
      id: String(post.number),
    },
  }));
  return postsIDs;
};

const getPostsFromGithub = async () => {
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

const getPostDetailsFromGithub = async (id: string) => {
  const response = await fetch(
    `https://api.github.com/repos/ivanbtrujillo/next-blog/issues/${id}`,
    {
      headers: {
        Authorization: `token ${process.env.githubToken}`,
      },
    }
  );

  const post = await response.json();

  const commentsResponse = await fetch(post.comments_url, {
    headers: {
      Authorization: `token ${process.env.githubToken}`,
    },
  });

  const commentsData = await commentsResponse.json();

  const comments = commentsData
    .map((comment) => matter(comment.body))
    .map((commentMatter) => ({
      content: commentMatter.content,
      ...commentMatter.data,
    }));

  const matterResult = matter(post.body);
  return {
    id: String(post.number),
    as: post.title.toLowerCase().replace(" ", "-"),
    title: post.title,
    comments,
    content: matterResult.content,
    ...matterResult.data,
  };
};

// DOMAIN dev-rofqlla8.auth0.com
// ID sL8K0Svso17s0Jv87uQkROUVVdHQE0Zp
