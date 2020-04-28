import { Title, Layout, LinkBtn } from "@components/index";

const user = {
  name: "Iván",
  lastName: "Trujillo",
};
export default () => (
  <Layout title="Next + Typescript + TailwindCSS">
    <div className="page">
      <div className="flex flex-col items-center">
        <img
          src="/images/ivan.png"
          className="w-48 h-48 rounded-full border-4 border-white object-cover"
          alt={user.name}
        />
        <h2 className="text-2xl tracking-tight leading-10 font-extrabold text-gray-900 sm:text-3xl sm:leading-none md:text-4xl">
          {user.name}
          <br className="xl:hidden" />
          <span className="text-blue-800">{user.lastName}</span>
        </h2>
      </div>
      <div className=" px-6 md:px-32  ">
        <div className="sm:text-center lg:text-left">
          <p className="mt-3 text-base text-gray-800 sm:mt-5 sm:text-lg  md:mt-5 lg:mx-0">
            Soy originario de Fasnia, Tenerife y actualmente vivo en El Sauzal.
            Llevo en el mundo del desarrollo desde 2014 cuando terminé mis
            estudios de técnico en desarrollo de aplicaciones multiplataforma.
          </p>
          <p className="mt-3 text-base text-gray-800 sm:mt-5 sm:text-lg  md:mt-5 lg:mx-0">
            Dichos estudios me han servido de poco, donde realmente he
            encontrado la formación que necesito ha sido en libros, conociendo a
            muy buenos profesionales y en cursos de distintas plataformas
            online. Durante este tiempo me enamoré de Javascript
          </p>
          <p className="mt-3 text-base text-gray-800 sm:mt-5 sm:text-lg  md:mt-5 lg:mx-0">
            Esta formación adicional me permitió en 2016 entrar a trabajar como
            desarollador frontend a Blue Sky Technology, rol que posteriormente
            paso a ser Frontend Lead donde me encargaba del desarrollo web y
            mobile utilizand React y React Native. Aunque me gustaba mi puesto
            de trabajo, quería seguir creciendo lo que hizo que no parara de
            formarme y aprender (y aún sigo haciéndolo).
          </p>
          <p className="mt-3 text-base text-gray-800 sm:mt-5 sm:text-lg  md:mt-5 lg:mx-0">
            A finales de 2018 dí el salto a Expero como Intermediate Frontend.
            Expero es una empresa americana ubicada en Houston que realiza
            desarrollos para las principales empresas de país. Entrar a Expero
            me ha permitido ser mucho más independiente, aprender de grandes
            profesionales y seguir formándome y creciendo. En enero de 2020
            celebramos el summit anual, donde fuí premiado por la compañia con
            un Rising Star,un bonus y un ascenso a Senior Frontend debido a mi
            desempeño a lo largo del año. Este reconocimiento para mi es
            especial ya que es basado en el feedback que el resto de mi equipo
            ha dado de mí. Siempre me he considerado un desarrollador de equipo
          </p>
          <p className="mt-3 text-base text-gray-800 sm:mt-5 sm:text-lg  md:mt-5 lg:mx-0">
            Actualmente sigo en Expero, me encuentro muy agusto y sigo
            formándome y aprendiendo.
          </p>
        </div>
      </div>
    </div>
  </Layout>
);
