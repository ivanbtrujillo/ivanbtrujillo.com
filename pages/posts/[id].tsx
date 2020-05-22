import {
  getPostDetailsFromGithub,
  getAllPostIds,
  getPostComments,
  saveComment,
} from "services/posts.service";
import {
  Layout,
  PostDate,
  CodeBlock,
  MarkdownEditor,
  PostTitle,
  Title,
  Button,
} from "components";
import ReactMarkdown from "react-markdown";
import { GetStaticProps, GetStaticPaths } from "next";
import { user as Author } from "constants/user";
import { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "use-auth0-hooks";
import { generateComment } from "utils/post";

export default function Post({
  post = { title: "", id: "", date: "2020-05-08", content: "" },
  comments: apiComments,
}) {
  const { isAuthenticated, isLoading, login, logout, user } = useAuth();
  const { query, asPath } = useRouter();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(apiComments);

  const addComment = async (comment) => {
    const date = new Date().toISOString();
    try {
      await saveComment({
        postId: post.id,
        comment: generateComment({ date, user, text: comment }),
      });

      const nextPostComments = [
        ...comments,
        ...[
          {
            date,
            user: user.name,
            userPicture: user.picture,
            content: comment,
          },
        ],
      ];

      setComments(nextPostComments);
      setComment("");
    } catch (err) {
      console.error("Error saving comment");
    }
  };

  function submitComment(event) {
    event.preventDefault();
    addComment(comment);
  }

  return (
    <Layout title={post.title}>
      <div className="max-w-screen-xl w-full md:mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto"></div>
        <PostTitle>{post.title}</PostTitle>
        <PostDate dateString={post.date} />
        <div className="flex items-end text-font-primary">
          <img
            src={Author.image}
            className="h-8 w-8 rounded-full text-font-primary mr-2"
          />
          {Author.name}
        </div>
        <ReactMarkdown
          className="markdown text-font-primary mt-8 mb-8"
          source={post.content}
          renderers={{ code: CodeBlock }}
        />
        <div className="bg-background-secondary mb-16 mt-16">
          <div className="max-w-screen-xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between flex-wrap"></div>
          </div>
        </div>
        {comments.length ? (
          <>
            {comments.map((comment, index) => (
              <div
                key={`${comment.id}-${index}`}
                className="my-8 border border-b border-gray-400 p-4"
              >
                <div className="flex flex-row">
                  <img
                    src={comment.userPicture}
                    className="w-8 h-8 mr-4 rounded-full"
                  />

                  <span className="leading-9 font-extrabold text-font-primary">
                    {comment.user}
                  </span>
                </div>
                <PostDate dateString={comment.date} />

                {
                  <ReactMarkdown
                    className="markdown text-font-primary mt-2"
                    source={comment.content}
                    renderers={{ code: CodeBlock }}
                  />
                }
              </div>
            ))}
            <h1 className="text-xl font-semibold text-font-primary mb-4">
              ¿Te ha gustado el artículo? Agradezco si me dejas tu feedback 😜
            </h1>
          </>
        ) : (
          <Title>Aún no hay comentarios. Se el primero! 😎</Title>
        )}
        {isLoading && <p> Cargando ...</p>}
        {!isAuthenticated && !isLoading && (
          <div className="flex flex-col">
            <Title>Debes de autenticarte para comentar 🙂</Title>

            <Button
              className="px-4 py-2 w-32 text-white bg-background-secondary hover:bg-background-secondary focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50"
              onClick={() =>
                login({ appState: { returnTo: { pathname: asPath, query } } })
              }
            >
              Autenticarme 🤙
            </Button>
          </div>
        )}

        {!isLoading && isAuthenticated && (
          <div className="flex flex-col">
            <div className="flex flex-row justify-between flex-1  w-full mb-8">
              <div className="flex items-center">
                <img
                  src={user.picture}
                  className="w-12 h-12 mb-4 rounded-full"
                />
                <p className="ml-4 font-semibold text-lg text-font-primary">
                  {user.name}
                </p>
              </div>
              <div className="flex flex-col justify-end">
                <Button
                  className=" px-4 py-2 w-32 text-white bg-red-500  hover:bg-red-400 focus:border-red-300 focus:shadow-outline-red active:text-gray-800 active:bg-gray-50"
                  onClick={() =>
                    logout({
                      returnTo: process.env.AUTH0_LOGOUT_REDIRECT_URI,
                    })
                  }
                >
                  Salir 👋
                </Button>
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
                  Write your comment here
                </label>
                <div style={{ height: "400px" }}>
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
                  <Button
                    disabled={user === "" || comment === ""}
                    className="px-6 py-3 w-full text-white bg-background-secondary hover:bg-blue-500 focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700"
                  >
                    Send comment
                  </Button>
                </span>
              </div>
            </form>
          </div>
        )}
      </div>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getAllPostIds();
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = await getPostDetailsFromGithub(params.id as string);
  const comments = await getPostComments(post.comments_url);

  return {
    props: {
      post,
      comments,
    },
    unstable_revalidate: 1,
  };
};
