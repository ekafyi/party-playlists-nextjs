import { AnimateSharedLayout } from "framer-motion";
import type { AppProps } from "next/app";
import "./app.css";

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => (
  <AnimateSharedLayout type="crossfade">
    <Component {...pageProps} />
  </AnimateSharedLayout>
);

export default MyApp;
