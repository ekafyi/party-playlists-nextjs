import { m as motion } from "framer-motion";
import { Track } from ".";
import type { Optional } from "../lib/type-helpers";

const MOTION_SINGLE_CONTAINER_VARIANTS = {
  visible: {
    opacity: 1,
    transition: { delay: 0.1, staggerChildren: 0.2, delayChildren: 0 },
  },
  hidden: { opacity: 0 },
};

interface SinglePlaylistTrackProps {
  data?: Optional<SpotifyApi.PlaylistObjectFull, | "collaborative" | "id" | "owner" | "public" | "followers" | "snapshot_id" | "type" | "href" | "uri" | "external_urls">; // prettier-ignore
}

const SinglePlaylistTrack = ({ data }: SinglePlaylistTrackProps) => {
  return typeof data !== "undefined" ? (
    <motion.div
      className="nojs-opacity-100 -mx-4 sm:mx-0"
      data-area="tracks"
      layout
      initial="hidden"
      animate="visible"
      variants={MOTION_SINGLE_CONTAINER_VARIANTS}
    >
      {data.tracks?.items.map(({ track, added_by }, index) => (
        <Track key={track.name} track={track} adder={added_by} trackNum={index + 1} />
      ))}
    </motion.div>
  ) : null;
};

export default SinglePlaylistTrack;
