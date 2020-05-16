import { Layout, User, Paragraph } from "components";

const user = {
  name: "Iván",
  lastName: "Trujillo",
};
const About = () => (
  <Layout title="Sobre mí">
    <div className="page">
      <User imageUrl="/images/ivan.png" user={user} className="mb-8" />
      <div className=" px-6 md:px-32  ">
        <div className="sm:text-center lg:text-left">
          <Paragraph>
            Soy de Fasnia, Tenerife 🏝 y actualmente vivo en El Sauzal, ubicado
            en el norte de la isla. Me adentré en el mundo del desarrollo en
            2014, cuando finalicé mis estudios como Técnico Superior de
            Aplicaciones Multiplataforma 📚.
          </Paragraph>
          <Paragraph>
            Siendo honesto, esos estudios me han servido de poco y dónde
            realmente he encontrado la formación que me ha permitido avanzar en
            mi carrera profesional ha sido en libros, cursos online impartidos
            por referentes del sector y conociendo otros desarrolladores en
            eventos 👨‍💻. Durante este tiempo me enamoré de Javascript y de la
            posibilidad de crear apliaciones para cualquier plataforma
            utilizando el mismo lenguaje. Realmente me pasaba mis tardes
            programando, aprendiendo nuevas metodologías y conociendo otros
            desarrolladores. Haciendo sideprojects solo para aprender.
          </Paragraph>
          <Paragraph>
            Esta formación adicional me permitió en 2016 empezar a trabajar como
            Frontend Developer en Blue Sky Technology 🤘, rol que un año despues
            se convirtió en Frontend Lead. Al principio empezamos a utilizar
            Angular 4 junto con Ionic, pero una vez fuí el lead empezamos a
            mover todo a React y a React native. Estaba contento con mi trabajo,
            pero quería seguir creciendo y aprendiendo. Durante todo este tiempo
            tampoco paré de aprender durante mi tiempo libre 🤓.
          </Paragraph>
          <Paragraph>
            A finales de 2018 me uní a Expero como Intermediate Frontend
            Developer 🚀🇺🇸. Expero es una empresa Americana ubicada en Houston /
            Austin (Texas) que realiza desarrollos para importantes empresas de
            USA. Unirme a ellos me ha permitido ser mucho mas independiente,
            aprender de grandes compañeros y miembros de expero y continuar
            creciendo.
          </Paragraph>
          <Paragraph>
            A principios de cada año celebramos el summit anual en Texas, y el
            equipo de Expero Tenerife viaja allí a pasar una semana con el resto
            de la compañía. En el año 2020 fuí premiado por la compañía con un
            Rising Star, un premio que otorgan a las personas de la empresa que
            han destacado durante el año. Acompañado del premio, obtuve un bonus
            económico y un ascenso a Senior Frontend Developer 🏆. Este
            reconocimiento es especial para mi ya que se basa en el feedback que
            han obtenido de los compañeros que han trabajado conmigo 🤝.
          </Paragraph>
          <Paragraph>
            Actualmente continuo trabajando y aprendiendo. Puedes hablarme a
            través de mis redes sociales, me encanta conocer gente nueva😜.
          </Paragraph>
        </div>
      </div>
    </div>
  </Layout>
);

export default About;
