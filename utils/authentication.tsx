import Router from "next/router";

/**
 * Where to send the user after they have signed in.
 */
export const onRedirectCallback = (appState) => {
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
export const onAccessTokenError = (err, options) => {
  console.error("Failed to retrieve access token: ", err);
};

/**
 * When signing in fails for some reason, we want to show it here.
 * @param {Error} err
 */
export const onLoginError = (err) => {
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
export const onRedirecting = () => {
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
