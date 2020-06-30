import { Layout, LinkBtn, Title, User, Paragraph, PostList } from "components";
import { getPostsFromGithub } from "services/posts.service";
import { user } from "constants/user";
import { technologies } from "constants/technologies";
import { FiChevronDown } from "react-icons/fi";
import { PostType } from "model/Post";
import { introduction } from "constants/texts";

interface HomeProps {
  posts: PostType[];
}

type TechnologyType = {
  alt: string;
  src: string;
};

const Technologies = ({ technologies }: { technologies: TechnologyType[] }) => (
  <div className="flex flex-row flex-wrap">
    {technologies.map(({ alt, src }: TechnologyType) => (
      <img
        key={alt}
        alt={alt}
        className="h-24 w-24 mr-2 mb-2 bg-black p-2"
        src={src}
      />
    ))}
  </div>
);

const MorePostButton = ({ amountOfPosts }: { amountOfPosts: number }) => {
  const showMorePostsBtn = amountOfPosts > 6;

  return (
    showMorePostsBtn && (
      <div className="my-8">
        <LinkBtn href="/posts">
          <>
            Hay mas aquí <FiChevronDown className="ml-2" />
          </>
        </LinkBtn>
      </div>
    )
  );
};

const Home = ({ posts }: HomeProps) => {
  return (
    <Layout title="Inicio" canonical="">
      <div className="page ">
        <div className="flex flex-col lg:flex-row items-center justify-center">
          <User user={user} />
          <div className=" px-4 sm:px-6 lg:px-8 ">
            <div className="text-left ">
              <Paragraph>{introduction}</Paragraph>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-4">
          <div className="flex flex-col">
            <div className="flex flex-col items-center flex-1 mx-4">
              <div className="w-full">
                <Title>Últimos posts</Title>
                <PostList posts={posts.slice(0, 6)} />
              </div>
              <MorePostButton amountOfPosts={posts.length} />
            </div>
            <div className="flex-1 mx-4 mt-8">
              <Title>Me gusta trabajar con</Title>
              <Technologies technologies={technologies} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const getStaticProps = async () => {
  const posts: PostType[] = await getPostsFromGithub();

  return {
    props: {
      posts,
    },
    unstable_revalidate: 1,
  };
};

export default Home;
