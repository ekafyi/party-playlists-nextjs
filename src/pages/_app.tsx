import { AnimateSharedLayout } from "framer-motion";
import type { AppProps } from "next/app";
import "./app.css";
// import { AnimateSharedLayout } from "framer-motion";

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => (
  <AnimateSharedLayout>
    <Component {...pageProps} />
  </AnimateSharedLayout>
);

export default MyApp;
