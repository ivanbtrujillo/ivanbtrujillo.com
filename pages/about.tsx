import { Title, Layout, LinkBtn } from "@components/index";

export default () => (
  <Layout title="Next + Typescript + TailwindCSS">
    <div className="page">
      <Title className="mb-4"> About page</Title>
      <LinkBtn href="/">Back to Main</LinkBtn>
    </div>
  </Layout>
);
