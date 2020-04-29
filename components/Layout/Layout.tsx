import Head from "next/head";
import { Header, HeaderLink } from "components";

type LayoutProps = {
  children: React.ReactChild | React.ReactChild[];
  title: string;
};

export const siteTitle = "ivanbtrujillo.com";

export const Layout: React.SFC<LayoutProps> = ({ children, title }) => {
  return (
    <div className=" overflow-y-scroll">
      <div className="flex flex-col h-screen max-w-screen-xl mx-auto ">
        <Head>
          <title>{`${title} - ivanbtrujillo.com`}</title>
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1"
          ></meta>
          <meta
            name="description"
            content="Ivan Trujillo personal website"
          ></meta>
          <meta
            property="og:image"
            content={`https://og-image.now.sh/Ivan%20Trujillo.png?theme=dark&md=1&fontSize=100px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-white-logo.svg&images=https%3A%2F%2Fpbs.twimg.com%2Fprofile_images%2F1254434620894044161%2F1-1_PQWI_400x400.jpg`}
          ></meta>
          <meta name="og:title" content={siteTitle} />
          <meta name="twitter:card" content="summary_large_image" />
          <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
        </Head>
        <Header>
          <div className="flex flex-1 justify-between ">
            <div className="flex-1 flex justify-start">
              <HeaderLink path="/" name="Home" />
              <HeaderLink path="/about" name="About" />
            </div>
            <div className="flex ">
              <a
                target="_blank"
                rel="noreferrer noopener"
                href="https://github.com/ivanbtrujillo"
              >
                <img
                  alt="perfil de github"
                  className="h-8 w-8 mx-2"
                  src="https://ivanbtrujillo.github.io/personal-website/static/media/github.7b355fcc.png"
                />
              </a>
              <a
                target="_blank"
                rel="noreferrer noopener"
                href="https://www.linkedin.com/in/ivanbtrujillo/"
              >
                <img
                  alt="perfil de linkedin"
                  className="h-8 w-8 mx-2"
                  src="data:image/png;base64,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"
                />
              </a>
              <a
                target="_blank"
                rel="noreferrer noopener"
                href="https://twitter.com/ivanbtrujillo/"
              >
                <img
                  alt="perfil de twitter"
                  className="h-8 w-8 mx-2"
                  src="data:image/png;base64,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"
                />
              </a>
            </div>
          </div>
        </Header>

        <div>{children}</div>
      </div>
    </div>
  );
};
