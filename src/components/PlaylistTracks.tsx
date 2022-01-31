import { m as motion } from "framer-motion";
import { Track } from ".";

const MOTION_SINGLE_CONTAINER_VARIANTS = {
  visible: {
    opacity: 1,
    transition: { delay: 0.1, staggerChildren: 0.2, delayChildren: 0 },
  },
  hidden: { opacity: 0 },
};

interface SinglePlaylistTrackProps {
  data?: IPlaylistFull["tracks"]["items"];
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
      {data.map((props, index) => (
        <Track key={props.track.name} data={props} trackNum={index + 1} />
      ))}
    </motion.div>
  ) : null;
};

export default SinglePlaylistTrack;
