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

export const Layout: React.SFC<LayoutProps> = ({ children }) => {
  const { theme, Toggler } = useThemeToggler();

  const socialLinks = () => (
    <div className="flex ">
      <a
        target="_blank"
        aria-label="github"
        className="w-8 h-8 ml-2 flex items-center"
        rel="noreferrer noopener"
        href="https://github.com/ivanbtrujillo"
      >
        <FiGithub
          aria-hidden="true"
          className="text-font-secondary w-6 h-6 hover:text-font-remark hover:w-7 hover:h-7 visible"
        />
      </a>
      <a
        target="_blank"
        rel="noreferrer noopener"
        aria-label="linkedin"
        className="w-8 h-8 ml-2 flex items-center"
        href="https://www.linkedin.com/in/ivanbtrujillo/"
      >
        <FiLinkedin className="text-font-secondary w-6 h-6  hover:text-font-remark hover:w-7 hover:h-7 visible" />
      </a>
      <a
        target="_blank"
        rel="noreferrer noopener"
        aria-label="twitter"
        className="w-8 h-8 ml-2 flex items-center "
        href="https://twitter.com/ivanbtrujillo/"
      >
        <FiTwitter
          aria-hidden="true"
          className="text-font-secondary  w-6 h-6  hover:text-font-remark hover:w-7 hover:h-7 visible"
        />
      </a>
    </div>
  );

  return (
    <div className={`${theme} bg-background-primary`}>
      <div className="flex flex-col">
        <Header>
          <div className="flex flex-1 justify-between flex-wrap max-w-screen-xl mx-auto ">
            <div className="flex-1 flex  my-2 justify-between sm:justify-start">
              <HeaderLink path="/" name="Inicio" />
              <HeaderLink path="/about" name="Sobre mí" />
              <HeaderLink path="/portfolio" name="Portfolio" />
            </div>

            <div className="flex items-center mx-4 justify-between sm:justify-end flex-1 ">
              <div className="sm:mr-8">
                <Toggler />
              </div>
              {socialLinks()}
            </div>
          </div>
        </Header>

        <div className="max-w-screen-xl mx-auto w-full ">{children}</div>
        <div className="bg-background-accent py-12 px-12 border-t border-gray-300 ">
          <div className="flex items-center justify-center">
            <div className="text-font-remark flex flex-row w-auto">
              Hecho con
              <FiHeart className="ml-1 mr-1 mt-1 text-font-secondary" /> por
              Iván Trujillo
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
