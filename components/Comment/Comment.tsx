import { PostDate, CodeBlock } from "components";
import ReactMarkdown from "react-markdown";
import { CommentType } from "model/Comment";

export const Comment = (comment: CommentType) => (
  <div className="my-8 p-4">
    <div className="flex flex-row">
      <img src={comment.userPicture} className="w-8 h-8 mr-4 rounded-full" />
      <span className="leading-9 font-extrabold text-font-primary">
        {comment.user}
      </span>
    </div>
    <PostDate dateString={comment.date} />
    <ReactMarkdown
      className="text-font-primary mt-2 "
      source={comment.content}
      renderers={{ code: CodeBlock }}
    />
  </div>
);
