import { PostDate } from "components";
import Link from "next/link";

type PostProps = {
  id: string;
  img: string;
  title: string;
  date: string;
  summary;
};

export const Post: React.SFC<PostProps> = ({
  id,
  img,
  title,
  date,
  summary,
}) => (
  <Link href="/posts/[id]" as={`/posts/${id}`} key={id}>
    <div className=" py-4 px-4 hover:bg-gray-300 cursor-pointer">
      <img src={img} alt={title} className="w-full h-56 object-cover mb-4" />
      <PostDate dateString={date} />
      <a href="#" className="block">
        <h3 className="mt-2 text-xl leading-7 font-semibold text-blue-800">
          {title}
        </h3>
        <p className="mt-3 text-base leading-6 text-gray-800">{summary}</p>
      </a>
    </div>
  </Link>
);
