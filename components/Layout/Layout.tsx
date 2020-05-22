import Head from "next/head";
import { Header, HeaderLink } from "components";
import { useThemeToggler } from "hooks/useThemeToggler/useThemeToggler";
import { user } from "constants/user";

type LayoutProps = {
  children: React.ReactChild | React.ReactChild[];
  title: string;
};

export const siteTitle = "ivanbtrujillo.com";
const description = "Iván Trujillo personal website";

export const Layout: React.SFC<LayoutProps> = ({ children, title }) => {
  const { theme, Toggler } = useThemeToggler();

  const socialLinks = () => (
    <div className="flex">
      <a
        target="_blank"
        rel="noreferrer noopener"
        href="https://github.com/ivanbtrujillo"
      >
        <img
          alt="perfil de github"
          className="h-8 w-8 mx-2 ml-8"
          src="https://res.cloudinary.com/ivanbtrujillo/image/upload/c_scale,q_55,w_32/v1590084898/15221874341530102002-256_cbipec"
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
          src="https://res.cloudinary.com/ivanbtrujillo/image/upload/c_scale,w_32/v1590085259/B6In1DFVNA905jsouZu45yQv4GixlQ0Yu4n8UdMssj3SXYVG1nRmIsNMBc0MlTM0s4yvJyG4h1pAypOO2OfIuFarGWuBn44lULaIklmfCsS3iDgECcYsRwPU64m7Nts_jq8kt8"
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
          src="https://res.cloudinary.com/ivanbtrujillo/image/upload/c_scale,q_63,w_32/v1590085052/_65QFl7B_400x400_jelpuy"
        />
      </a>
    </div>
  );

  return (
    <div className={`${theme} bg-background-primary`}>
      <div className="flex flex-col  max-w-screen-xl mx-auto ">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />

          <title>{`${title} - ${siteTitle}`}</title>
          <meta name="title" content={title} />
          <meta name="description" content="Iván Trujillo personal website" />
          <meta name="keywords" content="ivanbtrujillo" />

          <link rel="manifest" href="/manifest.json" />
          <link
            href="/favicon-16x16.png"
            rel="icon"
            type="image/png"
            sizes="16x16"
          />
          <link
            href="/favicon-32x32.png"
            rel="icon"
            type="image/png"
            sizes="32x32"
          />
          <link rel="apple-touch-icon" href="/apple-icon.png"></link>
          <meta name="theme-color" content="#000000" />

          <meta name="og:type" content="website" />
          <meta name="og:url" content="https://ivanbtrujillo.com/" />
          <meta name="og:title" content={`${title} - ${siteTitle}`} />
          <meta name="og:description" content={description} />
          <meta name="og:image" content={user.image} />

          <meta name="og:image:secure_url" content={user.image} />

          <meta name="twitter:site" content="@ivanbtrujillo" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:url" content="https://ivanbtrujillo.com/" />
          <meta name="twitter:title" content={`${title} - ${siteTitle}`} />
          <meta name="twitter:description" content={description} />
          <meta name="twitter:image" content={user.image} />

          <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
        </Head>
        <Header>
          <div className="flex flex-1 justify-between flex-wrap">
            <div className="flex-1 flex  my-2 justify-between sm:justify-start">
              <HeaderLink path="/" name="Inicio" />
              <HeaderLink path="/about" name="Sobre mí" />
              <HeaderLink path="/portfolio" name="Portfolio" />
            </div>

            <div className="flex items-center mx-4 items-end flex-1 justify-between">
              <Toggler />
              {socialLinks()}
            </div>
          </div>
        </Header>

        <div>{children}</div>
        <div className="bg-background-primary max-w-screen-xl py-12 px-12 border-t border-gray-300 ">
          <div className="flex items-center justify-center">
            <p className="text-font-primary">Hecho con 💟 por Iván Trujillo</p>
          </div>
        </div>
      </div>
    </div>
  );
};
