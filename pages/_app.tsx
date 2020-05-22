import { AppProps } from "next/app";
import "../css/main.css";
import Router from "next/router";
import { Auth0Provider } from "use-auth0-hooks";
import { useIsMounted } from "hooks/useIsMounted/useIsMounted";
/**
 * Where to send the user after they have signed in.
 */
const onRedirectCallback = (appState) => {
  if (appState && appState.returnTo) {
    Router.push({
      pathname: appState.returnTo.pathname,
      query: appState.returnTo.query,
    });
  }
};

/**
 * When it hasn't been possible to retrieve a new access token.
 * @param {Error} err
 * @param {AccessTokenRequestOptions} options
 */
const onAccessTokenError = (err, options) => {
  console.error("Failed to retrieve access token: ", err);
};

/**
 * When signing in fails for some reason, we want to show it here.
 * @param {Error} err
 */
const onLoginError = (err) => {
  Router.push({
    pathname: "/oops",
    query: {
      message: err.error_description || err.message,
      err,
    },
  });
};

/**
 * When redirecting to the login page you'll end up in this state where the login page is still loading.
 * You can render a message to show that the user is being redirected.
 */
const onRedirecting = () => {
  return (
    <div>
      <h1>Signing you in</h1>
      <p>
        In order to access this page you will need to sign in. Please wait while
        we redirect you to the login page...
      </p>
    </div>
  );
};

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
