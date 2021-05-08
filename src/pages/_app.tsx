import { AnimatePresence, AnimateSharedLayout } from "framer-motion";
import type { AppProps } from "next/app";
import "./app.css";
// import { AnimateSharedLayout } from "framer-motion";

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => (
  <AnimateSharedLayout type="crossfade">
    <AnimatePresence exitBeforeEnter>
      <Component {...pageProps} />
    </AnimatePresence>
  </AnimateSharedLayout>
);

export default MyApp;
