import "@fontsource/permanent-marker";
import type { AppProps } from "next/app";
import "./app.css";

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => <Component {...pageProps} />;

export default MyApp;
