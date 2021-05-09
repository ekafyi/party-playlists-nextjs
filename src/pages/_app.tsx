import { AnimateSharedLayout, domMax, LazyMotion } from "framer-motion";
import type { AppProps } from "next/app";
import "./app.css";

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => (
  <LazyMotion features={domMax}>
    <AnimateSharedLayout type="crossfade">
      <Component {...pageProps} />
    </AnimateSharedLayout>
  </LazyMotion>
);

export default MyApp;
