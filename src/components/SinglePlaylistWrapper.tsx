// import { AnimatePresence } from "framer-motion";
import type { ReactNode } from "react";
import styles from "./SinglePlaylistWrapper.module.css";

interface SinglePlaylistWrapperProps {
  children: ReactNode;
  // same as CardProps['listData']
  // data: { title: string; description: string; slug: string; images: SpotifyApi.SinglePlaylistResponse["images"] };
}

const SinglePlaylistWrapper = ({ children }: SinglePlaylistWrapperProps) => {
  return <div className={styles.singlePlaylist}>{children}</div>;
};

export default SinglePlaylistWrapper;
