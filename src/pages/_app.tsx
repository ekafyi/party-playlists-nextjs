import { AnimateSharedLayout } from "framer-motion";
import type { AppProps } from "next/app";
import "./app.css";
// import { AnimateSharedLayout, AnimatePresence } from "framer-motion";

// good example AnimateSharedLayout: https://codesandbox.io/s/framer-motion-animatesharedlayout-app-store-demo-yn8y1

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => (
  <AnimateSharedLayout type="crossfade">
    {/* <AnimatePresence> */}
    <Component {...pageProps} />
    {/* </AnimatePresence> */}
  </AnimateSharedLayout>
);

export default MyApp;
