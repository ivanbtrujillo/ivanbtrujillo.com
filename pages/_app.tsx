import { AppProps } from "next/app";
import "../css/main.css";
import { Auth0Provider } from "use-auth0-hooks";
import { useIsMounted } from "hooks/useIsMounted/useIsMounted";
import {
  onLoginError,
  onAccessTokenError,
  onRedirectCallback,
  onRedirecting,
} from "utils/authentication";
/**
 * Create a page which wraps the Auth0 provider.
 */

export default ({ Component, pageProps }: AppProps) => {
  const { isMounted } = useIsMounted();

  if (!isMounted) return <p>Cargando ...</p>;

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
