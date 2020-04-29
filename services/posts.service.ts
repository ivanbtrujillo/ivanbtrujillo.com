import fetch from "node-fetch";
import matter from "gray-matter";

export const getPostsFromGithub = async () => {
  const response = await fetch(
    "https://api.github.com/repos/ivanbtrujillo/next-blog/issues",
    {
      headers: {
        Authorization: `token ${process.env.githubToken}`,
      },
    }
  );

  return await response.json();
};

export const getAllPostIds = async () => {
  const response = await getPostsFromGithub();
  const postsIDs = response.map((post) => ({
    params: {
      id: String(post.number),
    },
  }));
  return postsIDs;
};

export const getPostDetailsFromGithub = async (id: string) => {
  const response = await fetch(
    `https://api.github.com/repos/ivanbtrujillo/next-blog/issues/${id}`,
    {
      headers: {
        Authorization: `token ${process.env.githubToken}`,
      },
    }
  );

  const post = await response.json();

  const matterResult = matter(post.body || "");
  return {
    id: String(post.number),
    as: post.title.toLowerCase().replace(" ", "-"),
    comments_url: post.comments_url,
    title: post.title,
    content: matterResult.content,
    ...matterResult.data,
  };
};

export const getPostComments = async (comments_url) => {
  const commentsResponse = await fetch(comments_url, {
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

export const rebuild = async () =>
  await fetch(
    `https://api.zeit.co/v1/integrations/deploy/QmV4UD3oa7bQmDAgD5sXQ9wTd1C4ykkNzmjHecvKzMyx3g/PCLFEpifPC`,
    {
      method: "POST",
    }
  );
