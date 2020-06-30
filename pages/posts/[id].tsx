import {
  getPostDetailsFromGithub,
  getAllPostIds,
} from "services/posts.service";
import { getPostComments } from "services/comments.service";

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
