import { motion } from "framer-motion"; // eslint-ignore
import { Share, Track } from "../components";
import { PLAYLIST_THUMB_SIZES, TRANSPARENT_PX_IMG } from "../lib/constants";
import { buildSrcSet, getMediumImage } from "../lib/get-spotify-image";
import { replaceUnicode } from "../lib/str-helpers";
import type { Optional } from "../lib/type-helpers";
import styles from "./SinglePlaylist.module.css";

// import { motion } from "framer-motion";

interface ISinglePlaylistProps {
  playlist: Optional<SpotifyApi.PlaylistObjectFull, | "collaborative" | "id" | "owner" | "public" | "followers" | "snapshot_id" | "type" | "href" | "uri" | "external_urls">; // prettier-ignore
}

const SinglePlaylist: React.FunctionComponent<ISinglePlaylistProps> = ({ playlist }) => {
  return (
    <motion.main layoutId={`card-${playlist.name}`} className={styles.playlist}>
      <div className={styles.playlist__artworkContainer}>
        <div className={styles.playlist__stickyContainer}>
          <div className={styles.playlist__artwork}>
            <img
              src={getMediumImage(playlist.images)?.url || TRANSPARENT_PX_IMG}
              sizes={PLAYLIST_THUMB_SIZES}
              srcSet={buildSrcSet(playlist.images)}
              alt=""
              width="300"
              height="300"
            />
          </div>
          <div className="pl-3 pt-1 sm:p-0">
            <div aria-hidden="true" className={`${styles.playlist__title} mb-3 sm:hidden`}>
              {playlist.name}
            </div>
            <Share title={playlist.name} />
          </div>
        </div>
      </div>
      <header className="pb-4">
        {/* FIXME */}
        {/* <motion.h2 className="bg-yellow-200 p-4" layoutId="foo">
          woww very transition much interactive
        </motion.h2> */}
        {/* // */}

        <h1 className={`${styles.playlist__title} sr-only sm:not-sr-only`}>{playlist.name}</h1>
        <p className={styles.playlist__desc}>{replaceUnicode(playlist.description || "")}</p>

        {/* TODO (someday) add playlist duration */}
        {/* https://gist.github.com/thelinmichael/5926997 */}
        {playlist.tracks.items.length && (
          <div className={styles.playlist__meta}>
            {playlist.tracks.items.length} {playlist.tracks.items.length > 1 ? "tracks" : "track"}
          </div>
        )}
      </header>
      <section className={styles.playlist__tracks} aria-label="tracks">
        {playlist.tracks.items.map(({ track, added_by }, index) => (
          <Track key={track.name} track={track} adder={added_by} trackNum={index + 1} />
        ))}
      </section>
    </motion.main>
  );
};

export default SinglePlaylist;
