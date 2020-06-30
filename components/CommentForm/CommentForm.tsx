import { saveComment } from "services/comments.service";

import { FiLogIn, FiLogOut } from "react-icons/fi";

import { CodeBlock, MarkdownEditor, Button } from "components";

import ReactMarkdown from "react-markdown";
import { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "use-auth0-hooks";
import { generateComment } from "utils/post";
import { CommentType } from "model/Comment";

export const CommentForm = ({ onAddComment, postId }) => {
  const [comment, setComment] = useState("");
  const { isAuthenticated, isLoading, login, logout, user } = useAuth();
  const { query, asPath } = useRouter();

  const addComment = async (comment: string) => {
    const date = new Date().toISOString();
    try {
      await saveComment({
        postId,
        comment: generateComment({ date, user, text: comment }),
      });

      const newComment: CommentType = {
        id: String(Math.random()),
        date,
        user: user.name,
        userPicture: user.picture,
        content: comment,
      };
      onAddComment(newComment);
      setComment("");
    } catch (err) {
      console.error("Error saving comment");
    }
  };

  function submitComment(event: React.FormEvent) {
    event.preventDefault();
    addComment(comment);
  }

  return (
    <>
      {isLoading && <p> Cargando ...</p>}
      {!isAuthenticated && !isLoading && (
        <Button
          className="px-4 py-2  mt-4 w-auto text-white bg-background-secondary hover:bg-background-secondary focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50"
          onClick={() =>
            login({ appState: { returnTo: { pathname: asPath, query } } })
          }
        >
          <>
            Autenticarme <FiLogIn className="ml-2" />
          </>
        </Button>
      )}
      {!isLoading && isAuthenticated && (
        <div className="flex flex-col">
          <div className="flex flex-row justify-between flex-1  w-full mb-8">
            <div className="flex items-center">
              <img src={user.picture} className="w-12 h-12 mb-4 rounded-full" />
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
                <>
                  Salir <FiLogOut className="ml-2" />
                </>
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
                  renderHTML={(text: string) => (
                    <ReactMarkdown
                      className="markdown mt-2"
                      source={text}
                      renderers={{ code: CodeBlock }}
                    />
                  )}
                  onChange={(e: { text: string }) => setComment(e.text)}
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
    </>
  );
};
