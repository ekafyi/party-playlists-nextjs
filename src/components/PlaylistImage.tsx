import { m as motion } from "framer-motion";
import Image from "next/image";
import { TRANSPARENT_PX_IMG } from "../lib/constants";
import styles from "./PlaylistImage.module.css";

interface PlaylistImageProps {
  content: SpotifyApi.SinglePlaylistResponse["images"];
  placement: "LIST" | "SINGLE";
}

const PlaylistImage = ({ content, placement }: PlaylistImageProps) => {
  if (!content) return null;
  return placement === "LIST" ? (
    <motion.div className={styles.card__artwork} layout>
      <Image
        alt=""
        className={styles.card__artwork__image}
        src={content[0]["url"]}
        layout="fill"
        blurDataURL={TRANSPARENT_PX_IMG}
        placeholder="blur"
      />
    </motion.div>
  ) : (
    <motion.div className={`${styles.card__artwork} ${styles["card__artwork--expanded"]}`} layout>
      <img
        alt=""
        className={styles.card__artwork__image}
        src={content[0]["url"]}
        width={content[0]["width"] || 192}
        height={content[0]["height"] || 192}
      />
    </motion.div>
  );
};

export default PlaylistImage;
