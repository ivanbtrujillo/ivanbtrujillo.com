import {
  getPostDetailsFromGithub,
  getAllPostIds,
} from "services/posts.service";
import { getPostComments } from "services/comments.service";
import Head from "next/head";
import {
  Layout,
  PostDate,
  CodeBlock,
  PostTitle,
  CommentForm,
  Comment,
} from "components";

import ReactMarkdown from "react-markdown";
import { GetStaticProps, GetStaticPaths } from "next";
import { user as Author } from "constants/user";
import { useState } from "react";
import { CommentType } from "model/Comment";
import { PostType } from "model/Post";

const PostHeader = ({ title, date, author }) => (
  <>
    <PostTitle>{title}</PostTitle>
    <div className="flex items-end text-font-primary">
      <img
        src={author.image}
        className="h-8 w-8 rounded-full text-font-primary mr-2"
      />
      {author.name} - <PostDate dateString={date} />
    </div>
  </>
);

const PostFooter = () => (
  <div className="w-full border-t border-border-secondary mt-8 mb-4 pt-4">
    <p className="text-medium font-semibold text-font-secondary  ">
      ¿Te ha gustado el artículo? Agradezco si me dejas tu feedback 😜
    </p>
  </div>
);

const Comments = ({ comments }: { comments: CommentType[] }) => (
  <>
    {comments.length ? (
      comments.map((comment: CommentType) => (
        <Comment key={comment.id} {...comment} />
      ))
    ) : (
      <p className="text-font-primary">Aún no hay comentarios</p>
    )}
  </>
);

interface PostProps {
  post: PostType;
  comments: CommentType[];
}

const Post = ({ post, comments }: PostProps) => {
  const [postComments, setComments] = useState(comments);

  const onAddComment = (newComment: CommentType) =>
    setComments([...postComments, ...[newComment]]);

  return (
    <div>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <title>{`${post.title}`}</title>
        <meta name="title" content={post.title} />
        <meta name="description" content="Iván Trujillo personal website" />
        <link
          rel="canonical"
          href={`https://ivanbtrujillo.com//posts/${post.id}`}
        />
        <meta name="keywords" content="ivanbtrujillo" />

        <link rel="manifest" href="/manifest.json" />

        <link
          rel="apple-touch-icon"
          sizes="57x57"
          href="icons/apple-icon-57x57.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href="icons/apple-icon-60x60.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="icons/apple-icon-72x72.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="icons/apple-icon-76x76.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="icons/apple-icon-114x114.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="icons/apple-icon-120x120.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="icons/apple-icon-144x144.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="icons/apple-icon-152x152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="icons/apple-icon-180x180.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="icons/android-icon-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="icons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="icons/favicon-96x96.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="icons/favicon-16x16.png"
        />
        <link rel="manifest" href="/manifest.json" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
        <meta name="theme-color" content="#000000" />

        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@ivanbtrujillo" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.summary} />
        <meta name="twitter:image" content={post.img} />
      </Head>

      <Layout
        title={post.title}
        description={post.summary}
        image={post.img}
        canonical={`/posts/${post.id}`}
      >
        <div className="max-w-screen-xl w-full md:mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8">
          <PostHeader title={post.title} date={post.date} author={Author} />
          <ReactMarkdown
            className="markdown text-font-primary mt-8 mb-8"
            source={post.content}
            renderers={{ code: CodeBlock }}
          />
          <PostFooter />
          <Comments comments={postComments} />
          <CommentForm postId={post.id} onAddComment={onAddComment} />
        </div>
      </Layout>
    </div>
  );
};

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

export default Post;
