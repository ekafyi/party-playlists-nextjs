import { domMax, LazyMotion } from "framer-motion";
import type { AppProps } from "next/app";
import "./app.css";

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => (
  <LazyMotion features={domMax}>
    <Component {...pageProps} />
  </LazyMotion>
);

export default MyApp;
