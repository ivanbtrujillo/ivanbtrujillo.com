import React, { useState, useEffect, useContext } from "react";
import createAuth0Client, {
  Auth0ClientOptions,
  Auth0Client,
} from "@auth0/auth0-spa-js";

export const Auth0Context = React.createContext(undefined);
export const useAuth0 = () => useContext(Auth0Context);
export const Auth0Provider = ({
  children,
  onRedirectCallback,
  ...initOptions
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState();
  const [auth0Client, setAuth0] = useState();
  const [loading, setLoading] = useState(true);
  const [popupOpen, setPopupOpen] = useState(false);

  useEffect(() => {
    const initAuth0 = async () => {
      const auth0FromHook = await createAuth0Client(
        initOptions as Auth0ClientOptions
      );
      setAuth0(auth0FromHook as any);

      if (
        window.location.search.includes("code=") &&
        window.location.search.includes("state=")
      ) {
        const { appState } = await auth0FromHook.handleRedirectCallback();
        onRedirectCallback(appState);
      }

      const isAuthenticated = await auth0FromHook.isAuthenticated();

      setIsAuthenticated(isAuthenticated);

      if (isAuthenticated) {
        const user = await auth0FromHook.getUser();
        setUser(user);
      }

      setLoading(false);
    };
    initAuth0();
    // eslint-disable-next-line
  }, []);

  const loginWithPopup = async (params = {}) => {
    setPopupOpen(true);
    try {
      await (auth0Client as Auth0Client).loginWithPopup(params);
    } catch (error) {
      console.error(error);
    } finally {
      setPopupOpen(false);
    }
    const user = await (auth0Client as Auth0Client).getUser();
    setUser(user);
    setIsAuthenticated(true);
  };

  const handleRedirectCallback = async () => {
    setLoading(true);
    await (auth0Client as Auth0Client).handleRedirectCallback();
    const user = await (auth0Client as Auth0Client).getUser();
    setLoading(false);
    setIsAuthenticated(true);
    setUser(user);
  };
  return (
    <Auth0Context.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        popupOpen,
        loginWithPopup,
        handleRedirectCallback,
        getIdTokenClaims: (...p) =>
          (auth0Client as Auth0Client).getIdTokenClaims(...p),
        loginWithRedirect: (...p) =>
          (auth0Client as Auth0Client).loginWithRedirect(...p),
        getTokenSilently: (...p) =>
          (auth0Client as Auth0Client).getTokenSilently(...p),
        getTokenWithPopup: (...p) =>
          (auth0Client as Auth0Client).getTokenWithPopup(...p),
        logout: (...p) => (auth0Client as Auth0Client).logout(...p),
      }}
    >
      {children}
    </Auth0Context.Provider>
  );
};
