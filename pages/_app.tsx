import { AppProps } from "next/app";
import "../css/main.css";

import { useIsMounted } from "hooks/useIsMounted/useIsMounted";

/**
 * Create a page which wraps the Auth0 provider.
 */

export default ({ Component, pageProps }: AppProps) => {
  const { isMounted } = useIsMounted();

  if (!isMounted) return <p>Cargando ...</p>;

  return <Component {...pageProps} />;
};
