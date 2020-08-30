import { Layout, Paragraph, Title } from "components";
import { portfolio } from "constants/portfolio";

const CodeSanboxIframe = ({ url }: { url: string }) => (
  <iframe
    className="border border-black rounded-sm overflow-hidden mt-4"
    src={url}
    style={{
      width: "100%",
      height: "400px",
    }}
    title="intelligent-hertz-q7frd"
    allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr"
    sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  ></iframe>
);

const Portafolio = () => {
  return (
    <Layout>
      <div className="page">
        <div className="sm:text-center lg:text-left">
          {portfolio.map(project => (
            <div className="p-8">
              <Title className="text-font-secondary">{project.title}</Title>
              <Paragraph>{project.description}</Paragraph>
              <CodeSanboxIframe url={project.url} />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Portafolio;
