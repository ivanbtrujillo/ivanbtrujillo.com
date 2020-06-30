import { PostDate } from "components";
import Link from "next/link";

type PostProps = {
  id: string;
  img: string;
  title: string;
  date: string;
  summary: string;
};

export const Post: React.SFC<PostProps> = ({
  id,
  img,
  title,
  date,
  summary,
}) => (
  <Link href="/posts/[id]" as={`/posts/${id}`} key={id}>
    <div className=" py-4 px-4 bg-background-accent border border-border-primary hover:border-border-secondary cursor-pointer">
      <img src={img} alt={title} className="w-full h-56 object-cover mb-4" />
      <PostDate dateString={date} />
      <a href="#" className="block">
        <h3 className="mt-2 text-xl leading-7 font-semibold text-font-secondary">
          {title}
        </h3>
        <p className="mt-3 text-base font-light leading-6 text-font-primary">
          {summary}
        </p>
      </a>
    </div>
  </Link>
);
