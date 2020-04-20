import Head from "next/head";
import { Header, HeaderLink } from "@components/index";

interface ILayout {
  children: React.ReactChild | React.ReactChild[];
  title: string;
}

export const Layout = ({ children, title }: ILayout) => {
  return (
    <div className=" flex flex-col h-screen w-screen ">
      <Head>
        <title>{title}</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        ></meta>
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </Head>
      <Header>
        <HeaderLink path="/" name="Home" />
        <HeaderLink path="/about" name="About" />
      </Header>

      <div className="flex flex-col flex-1 items-center overflow-auto">
        {children}
      </div>
    </div>
  );
};
