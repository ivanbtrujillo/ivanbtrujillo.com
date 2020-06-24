import Head from "next/head";
import { Header, HeaderLink } from "components";
import { useThemeToggler } from "hooks/useThemeToggler/useThemeToggler";
import { FiGithub, FiTwitter, FiLinkedin, FiHeart } from "react-icons/fi";

type LayoutProps = {
  children: React.ReactChild | React.ReactChild[];
  title: string;
  canonical: string;
  description?: string;
  image?: string;
};

export const siteTitle = "ivanbtrujillo.com";

export const Layout: React.SFC<LayoutProps> = ({
  children,
  title,
  canonical,
  description = "",
  image = "https://images.unsplash.com/photo-1497091071254-cc9b2ba7c48a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1353&q=80",
}) => {
  const { theme, Toggler } = useThemeToggler();

  const socialLinks = () => (
    <div className="flex">
      <a
        target="_blank"
        rel="noreferrer noopener"
        href="https://github.com/ivanbtrujillo"
      >
        <FiGithub className="text-font-secondary w-6 h-6 ml-6" />
      </a>
      <a
        target="_blank"
        rel="noreferrer noopener"
        href="https://www.linkedin.com/in/ivanbtrujillo/"
      >
        <FiLinkedin className="text-font-secondary w-6 h-6 ml-2" />
      </a>
      <a
        target="_blank"
        rel="noreferrer noopener"
        href="https://twitter.com/ivanbtrujillo/"
      >
        <FiTwitter className="text-font-secondary w-6 h-6 ml-2" />
      </a>
    </div>
  );

  return (
    <div className={`${theme} bg-background-primary`}>
      <div className="flex flex-col">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <title>{`${title} - ${siteTitle}`}</title>
          <meta name="title" content={title} />
          <meta name="description" content="Iván Trujillo personal website" />
          <link
            rel="canonical"
            href={`https://ivanbtrujillo.com/${canonical}`}
          />
          <meta name="keywords" content="ivanbtrujillo" />

          <link rel="manifest" href="/manifest.json" />

          <link
            rel="apple-touch-icon"
            sizes="57x57"
            href="icons/apple-icon-57x57.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="60x60"
            href="icons/apple-icon-60x60.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="72x72"
            href="icons/apple-icon-72x72.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="76x76"
            href="icons/apple-icon-76x76.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="114x114"
            href="icons/apple-icon-114x114.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="120x120"
            href="icons/apple-icon-120x120.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="144x144"
            href="icons/apple-icon-144x144.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="152x152"
            href="icons/apple-icon-152x152.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="icons/apple-icon-180x180.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="192x192"
            href="icons/android-icon-192x192.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="icons/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="96x96"
            href="icons/favicon-96x96.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="icons/favicon-16x16.png"
          />
          <link rel="manifest" href="/manifest.json" />
          <meta name="msapplication-TileColor" content="#000000" />
          <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
          <meta name="theme-color" content="#000000" />

          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@ivanbtrujillo" />
          <meta name="twitter:creator" content="@ivanbtrujillo" />
          <meta name="twitter:title" content={`${title} - ${siteTitle}`} />
          <meta name="twitter:description" content={description} />
          <meta name="twitter:image" content={image} />

          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
            rel="stylesheet"
          />
        </Head>
        <Header>
          <div className="flex flex-1 justify-between flex-wrap max-w-screen-xl mx-auto ">
            <div className="flex-1 flex  my-2 justify-between sm:justify-start">
              <HeaderLink path="/" name="Inicio" />
              <HeaderLink path="/about" name="Sobre mí" />
              <HeaderLink path="/portfolio" name="Portfolio" />
            </div>

            <div className="flex items-center mx-4 justify-between sm:justify-end flex-1 ">
              <Toggler />
              {socialLinks()}
            </div>
          </div>
        </Header>

        <div className="max-w-screen-xl mx-auto ">{children}</div>
        <div className="bg-background-accent py-12 px-12 border-t border-gray-300 ">
          <div className="flex items-center justify-center">
            <div className="text-font-remark flex flex-row w-auto">
              Hecho con <FiHeart className="ml-1 mr-1 mt-1" /> por Iván Trujillo
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
