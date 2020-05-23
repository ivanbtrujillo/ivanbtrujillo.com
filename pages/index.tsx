import { Layout, LinkBtn, Title, User, Paragraph, Post } from "components";
import { getPostsFromGithub } from "services/posts.service";
import matter from "gray-matter";
import { user } from "constants/user";
import { technologies } from "constants/technologies";

interface Post {
  id: string;
  img: string;
  title: string;
  date: string;
}

const Home = ({ posts }) => (
  <Layout title="Inicio" canonical="">
    <div className="page ">
      <div className="flex flex-col lg:flex-row items-center justify-center">
        <User user={user} />
        <div className="  px-4 sm:px-6  lg:px-8 ">
          <div className="text-center lg:text-left ">
            <Paragraph className="sm:max-w-xl sm:mx-auto">
              Hola 👋, soy un desarrollador enfocado en javascript y su
              ecosistema. Me encanta aprender, seguir buenas practicas y aportar
              a los equipos con los que trabajo.
            </Paragraph>

            <Paragraph className="sm:max-w-xl sm:mx-auto">
              Creo que el mejor código es aquel que es facil de leer
              (declarativo), facil de cambiar y facil de borrar (testeado e
              inmutable). Esto no es sencillo y requiere dedicación, pero si lo
              consigues estarás añadiendo un gran valor al producto, al código y
              a tu equipo.
            </Paragraph>
          </div>
        </div>
      </div>
      <div className=" mt-10 pt-4  ">
        <div className="flex flex-col ">
          <div className="flex flex-col items-center flex-1 mx-4">
            <div className="mb-8 w-full">
              <Title>Últimos posts</Title>
              <div className="grid grid-cols-1 col-gap-4 md:grid-cols-3 w-full">
                {posts.slice(0, 3).map((post) => (
                  <Post key={post.id} {...post} />
                ))}
              </div>
            </div>
            {posts.length > 3 && (
              <LinkBtn href="/posts">Hay mas aquí 👇</LinkBtn>
            )}
          </div>
          <div className=" flex-1 mx-4 ">
            <Title>Me gusta trabajar con</Title>
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

export const getStaticProps = async () => {
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

  return {
    props: {
      posts,
    },
    unstable_revalidate: 1,
  };
};

export default Home;
