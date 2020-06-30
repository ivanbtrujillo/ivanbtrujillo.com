import fetch from "node-fetch";
import matter from "gray-matter";
import { CommentType, CommentResponseType } from "model/Comment";

type MatterResultCommentType = {
  data: {
    id: string;
    userPicture: string;
    date: string;
    user: string;
  };
  content: string;
};

export const getPostComments = async (comments_url: string) => {
  const commentsResponse = await fetch(comments_url, {
    headers: {
      Authorization: `token ${process.env.githubToken}`,
    },
  });

  const commentsData: CommentResponseType = await commentsResponse.json();

  const comments: CommentType[] = commentsData
    .map(
      comment =>
        (matter(comment.body || "") as unknown) as MatterResultCommentType
    )
    .map(commentMatter => ({
      content: commentMatter.content,
      ...commentMatter.data,
    }));

  return comments;
};

export const saveComment = async ({
  postId,
  comment,
}: {
  postId: string;
  comment: string;
}) =>
  await fetch(
    `https://api.github.com/repos/ivanbtrujillo/next-blog/issues/${postId}/comments`,
    {
      method: "POST",
      headers: {
        Authorization: `token ${process.env.githubToken}`,
      },
      body: JSON.stringify({
        body: comment,
      }),
    }
  );
