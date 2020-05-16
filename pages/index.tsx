import {
  Layout,
  LinkBtn,
  Title,
  User,
  Paragraph,
  Post,
  PlaceholderPost,
} from "components";
import { getPostsFromGithub } from "services/posts.service";
import matter from "gray-matter";
import { useEffect, useState } from "react";

const user = {
  name: "Iván",
  lastName: "Trujillo",
};

interface Post {
  id: string;
  img: string;
  title: string;
  date: string;
  summary;
}

const technologies = [
  {
    alt: "javascript",
    src: "/images/javascript.svg.png",
  },

  {
    alt: "typescript",
    src: "/images/typescript.svg",
  },

  {
    alt: "next",
    src: "/images/next.png",
  },

  {
    alt: "react",

    src: "/images/react.png",
  },

  {
    alt: "tailwind",

    src: "/images/tailwind.png",
  },

  {
    alt: "node",

    src: "/images/node.svg",
  },

  {
    alt: "firestore",

    src: "/images/firestore.png",
  },

  {
    alt: "jest",

    src: "/images/jest.png",
  },
];
const Home = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  const getPosts = async () => {
    const data = await getPostsFromGithub();

    const posts = data.map((post) => {
      const matterResult = matter(post.body || "");
      return {
        id: post.number,
        title: post.title,
        content: matterResult.content,
        ...matterResult.data,
      };
    });
    setTimeout(() => {
      setPosts(posts);
    }, 500);
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <Layout title="Home">
      <div className="page ">
        <div className="flex flex-col lg:flex-row items-center justify-center">
          <User imageUrl="/images/ivan.png" user={user} />
          <div className="  px-4 sm:px-6  lg:px-8 ">
            <div className="text-center lg:text-left ">
              <Paragraph className="sm:max-w-xl sm:mx-auto">
                Hi 👋, I'm a developer focused on Javascript and it's ecosystem.
                I like to learn, follow good practices and keep my code as
                simple as posible.
              </Paragraph>

              <Paragraph className="sm:max-w-xl sm:mx-auto">
                In my opinion, the best code is the one that is easy to read,
                easy to change and easy to delete. This is not easy to do but if
                you accomplish it you are adding a lot of value and helping your
                team.
              </Paragraph>
            </div>
          </div>
        </div>
        <div className=" mt-10 pt-4  ">
          <div className="flex flex-col ">
            <div className="flex flex-col items-center flex-1 mx-4">
              <div className="mb-8 w-full">
                <Title>Lastest posts</Title>
                <div className="grid grid-cols-1 col-gap-4 md:grid-cols-3 w-full">
                  {posts.length === 0 &&
                    Array.from({ length: 3 }).map((_, index) => (
                      <PlaceholderPost key={`placeholder-${index}`} />
                    ))}
                  {posts.slice(0, 3).map((post) => (
                    <Post key={post.id} {...post} />
                  ))}
                </div>
              </div>
              {posts.length > 3 && <LinkBtn href="/posts">More posts</LinkBtn>}
            </div>
            <div className=" flex-1 mx-4 ">
              <Title>I like to work with</Title>
              <div className="flex flex-row flex-wrap">
                {technologies.map(({ alt, src }) => (
                  <img
                    key={alt}
                    alt={alt}
                    className="h-24 w-24 mr-2 mb-2 bg-black p-2"
                    src={src}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

// export const getStaticProps: GetStaticProps = async () => {
//   const data = await getPostsFromGithub();

//   const posts = data.map((post) => {
//     const matterResult = matter(post.body || "");
//     return {
//       id: post.number,
//       title: post.title,
//       content: matterResult.content,
//       ...matterResult.data,
//     };
//   });

//   return {
//     props: {
//       posts,
//     },
//   };
// };

export default Home;
