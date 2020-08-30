import { AppProps } from "next/app";
import "../css/main.css";
import "github-markdown-css";
import { Auth0Provider } from "use-auth0-hooks";
import {
  onLoginError,
  onAccessTokenError,
  onRedirectCallback,
  onRedirecting,
} from "utils/authentication";

export default ({ Component, pageProps }: AppProps) => {
  return (
    <Auth0Provider
      domain={process.env.AUTH0_DOMAIN}
      clientId={process.env.AUTH0_CLIENT_ID}
      redirectUri={process.env.AUTH0_REDIRECT_URI}
      onLoginError={onLoginError}
      onAccessTokenError={onAccessTokenError}
      onRedirecting={onRedirecting}
      onRedirectCallback={onRedirectCallback}
    >
      <Component {...pageProps} />
    </Auth0Provider>
  );
};
