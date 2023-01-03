import fetch from "node-fetch";
import matter from "gray-matter";
import {PostResponseType, PostType} from "model/Post";

type MatterResultPostType = {
  data: {
    img: string;
    date: string;
    summary: string;
  };
  content: string;
};

type PostIdType = {
  params: {
    id: string;
  };
};

export const getPostsFromGithub = async () => {
  const response = await fetch(
    "https://api.github.com/repos/ivanbtrujillo/ivanbtrujillo.com/issues",
    {
      headers: {
        Authorization: `token ${process.env.NEXT_PUBLIC_githubToken}`,
      },
    }
  );

  const data = (await response.json()) as PostResponseType[];

  console.log({data});

  const userIssues = (data ?? []).filter(
    ghIssue => ghIssue.user.login === process.env.NEXT_PUBLIC_GH_ISSUES_USER
  );

  const posts: PostType[] = userIssues.map((post: PostResponseType) => {
    const matterResult = matter(
      post.body || ""
    ) as unknown as MatterResultPostType;

    return {
      id: String(post.number),
      title: post.title,
      content: matterResult.content,
      ...matterResult.data,
    };
  });

  return posts;
};

export const getAllPostIds = async () => {
  const response = await getPostsFromGithub();
  const postsIDs: PostIdType[] = response.map(post => ({
    params: {
      id: post.id,
    },
  }));

  return postsIDs;
};

export const getPostDetailsFromGithub = async (id: string) => {
  const response = await fetch(
    `https://api.github.com/repos/ivanbtrujillo/ivanbtrujillo.com/issues/${id}`,
    {
      headers: {
        Authorization: `token ${process.env.NEXT_PUBLIC_githubToken}`,
      },
    }
  );

  const responseData = (await response.json()) as PostResponseType;

  const matterResult = matter(
    responseData.body || ""
  ) as unknown as MatterResultPostType;
  const post = {
    id: String(responseData.number),
    as: responseData.title.toLowerCase().replace(" ", "-"),
    comments_url: responseData.comments_url,
    title: responseData.title,
    content: matterResult.content,
    ...matterResult.data,
  };
  return post;
};
