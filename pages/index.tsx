import { Title, Layout, LinkBtn } from "@components/index";

export default () => (
  <Layout title="Next + Typescript + TailwindCSS">
    <div className="page">
      <Title className="mb-4">Main page</Title>
      <LinkBtn href="/about">Go to about</LinkBtn>
    </div>
  </Layout>
);
