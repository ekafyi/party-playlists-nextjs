import { motion } from "framer-motion";
import { Share, Track } from "../components";
import { PLAYLIST_THUMB_SIZES, TRANSPARENT_PX_IMG } from "../lib/constants";
import { buildSrcSet, getMediumImage } from "../lib/get-spotify-image";
import { replaceUnicode } from "../lib/str-helpers";
import type { Optional } from "../lib/type-helpers";
import styles from "./SinglePlaylist.module.css";

interface ISinglePlaylistProps {
  playlist: Optional<SpotifyApi.PlaylistObjectFull, | "collaborative" | "id" | "owner" | "public" | "followers" | "snapshot_id" | "type" | "href" | "uri" | "external_urls">; // prettier-ignore
}

const TITLE_TRANSITION = { duration: 0.4, delay: 0.2 };
const TRACKLIST_TRANSITION = { duration: 0.4, delay: 0.5 };

const COMMON_VARIANTS = {
  hidden: { opacity: 0 },
  // exit: { opacity: 0 },
};

const TITLE_VARIANTS = {
  ...COMMON_VARIANTS,
  shown: { opacity: 1, transition: TITLE_TRANSITION },
};

const TRACKLIST_VARIANTS = {
  ...COMMON_VARIANTS,
  shown: { opacity: 1, transition: TRACKLIST_TRANSITION },
};

const SinglePlaylist: React.FunctionComponent<ISinglePlaylistProps> = ({ playlist }) => {
  return (
    <main className={styles.playlist}>
      <div className={styles.playlist__artworkContainer}>
        <div className={styles.playlist__stickyContainer}>
          <motion.div layoutId={`thumb-${playlist.name}`} className={styles.playlist__artwork}>
            <img
              src={getMediumImage(playlist.images)?.url || TRANSPARENT_PX_IMG}
              sizes={PLAYLIST_THUMB_SIZES}
              srcSet={buildSrcSet(playlist.images)}
              alt=""
              width="300"
              height="300"
            />
          </motion.div>
          <motion.div variants={TITLE_VARIANTS} initial="hidden" animate="shown" className="pl-3 pt-1 sm:p-0">
            <div aria-hidden="true" className={`${styles.playlist__title} mb-3 sm:hidden`}>
              {playlist.name}
            </div>
            <Share title={playlist.name} />
          </motion.div>
        </div>
      </div>
      <motion.header variants={TITLE_VARIANTS} initial="hidden" animate="shown" className="pb-4">
        <h1 className={`${styles.playlist__title} sr-only sm:not-sr-only`}>{playlist.name}</h1>
        <p className={styles.playlist__desc}>{replaceUnicode(playlist.description || "")}</p>
        {playlist.tracks.items.length && (
          <div className={styles.playlist__meta}>
            {playlist.tracks.items.length} {playlist.tracks.items.length > 1 ? "tracks" : "track"}
          </div>
        )}
      </motion.header>
      <motion.section
        variants={TRACKLIST_VARIANTS}
        initial="hidden"
        animate="shown"
        className={styles.playlist__tracks}
        aria-label="tracks"
      >
        {playlist.tracks.items.map(({ track, added_by }, index) => (
          <Track key={track.name} track={track} adder={added_by} trackNum={index + 1} />
        ))}
      </motion.section>
    </main>
  );
};

export default SinglePlaylist;
