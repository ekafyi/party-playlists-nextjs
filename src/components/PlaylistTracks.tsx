import { m as motion } from "framer-motion";
import { Spinner, Track } from ".";

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
  ) : (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      data-area="tracks"
      className="flex items-center justify-center p-8 text-indigo-400"
    >
      <Spinner />
    </motion.div>
  );
};

export default SinglePlaylistTrack;
