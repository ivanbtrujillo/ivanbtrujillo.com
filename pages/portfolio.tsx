import { Layout, Paragraph, Title } from "components";

const projects = [
  {
    title: "Tailwind Table",
    description:
      "Una tabla con custom cell renders y filtros hecha con TailwindCSS, React y Typescript",
    url:
      "https://codesandbox.io/embed/intelligent-hertz-q7frd?fontsize=14&hidenavigation=1&theme=dark",
  },
  {
    title: "Conf Landing",
    description:
      "Una landing page para un evento hecha con TailwindCSS y AlpineJS",
    url:
      "https://codesandbox.io/embed/wispy-sunset-3y222?fontsize=14&hidenavigation=1&theme=dark",
  },
];

export default () => {
  return (
    <Layout title="Portfolio">
      <div className="page">
        <div className="sm:text-center lg:text-left">
          {projects.map((project) => (
            <div className="p-8">
              <Title className="text-font-secondary">{project.title}</Title>
              <Paragraph>{project.description}</Paragraph>
              <iframe
                className="border border-black rounded-sm overflow-hidden mt-4"
                src={project.url}
                style={{
                  width: "100%",
                  height: "400px",
                }}
                title="intelligent-hertz-q7frd"
                allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr"
                sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
              ></iframe>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};
