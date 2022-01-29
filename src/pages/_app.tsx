import { LayoutGroup, LazyMotion } from "framer-motion";
import type { AppProps } from "next/app";
import "./app.css";

// Make sure to return the specific export containing the feature bundle.
const loadFeatures = () => import("../lib/framer-motion-features").then((res) => res.default);

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <LazyMotion features={loadFeatures}>
      <LayoutGroup>
        <Component {...pageProps} />
      </LayoutGroup>
    </LazyMotion>
  );
};

export default MyApp;
