import { m as motion } from "framer-motion";
import dynamic from "next/dynamic";
import { TRANSPARENT_PX_IMG } from "../lib/constants";
import { getSmallestImage } from "../lib/get-spotify-image";
import styles from "./Track.module.css";
import TrackLink from "./TrackLink";

interface ITrackProps {
  data: SimplePlaylistTrackObject;
  trackNum: number;
}

// Dynamically import component client-side.
// https://nextjs.org/docs/advanced-features/dynamic-import
const InView = dynamic(() => import("react-intersection-observer").then((obs) => obs.InView), {
  ssr: false,
});

const MOTION_TRACK_VARIANTS = {
  hidden: { opacity: 0, transform: "translateY(8px)" },
  visible: { opacity: 1, transform: "translateY(0)", transition: { duration: 0.3 } },
};

const Track: React.FunctionComponent<ITrackProps> = ({ data, trackNum }) => {
  const { track } = data;
  const adder = data.added_by;

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <InView rootMargin="0px 0px 40px 0px" triggerOnce={true}>
      {({ inView, ref }) => (
        <motion.article
          className={`${styles.track} nojs-opacity-100 nojs-transform-none`}
          tabIndex={0}
          variants={MOTION_TRACK_VARIANTS}
          ref={ref}
        >
          <span className={styles.track__num}>{trackNum}</span>
          {track.album.images ? (
            <>
              <div className={styles.track__artwork}>
                <img
                  crossOrigin="anonymous"
                  src={inView ? getSmallestImage(track.album.images).url : TRANSPARENT_PX_IMG}
                  className={inView ? "opacity-100" : "opacity-0"}
                  alt=""
                  width="60"
                  height="60"
                />
              </div>
              <div aria-hidden="true" className={`${styles.track__artwork} nojs-hidden`} />
              <noscript>
                <div className={styles.track__artwork}>
                  <img src={getSmallestImage(track.album.images).url} alt="" width="60" height="60" />
                </div>
              </noscript>
            </>
          ) : (
            <img aria-hidden="true" src={TRANSPARENT_PX_IMG} width="200" height="200" alt="" />
          )}
          <div className={styles.track__text}>
            <h2 className={styles.track__title}>{track.name}</h2>
            <div className={styles.track__bylineContainer}>
              <p className={styles.track__artist}>{track.artists.map((artist) => artist.name).join(", ")}</p>
              <p className={styles.track__adder}>
                {/*
                // Note: display_name exists on Spotify API but always returned empty
                // https://github.com/spotify/web-api/issues/371
                // https://github.com/spotify/web-api/issues/569
                */}
                {` — added by: `}
                {adder.url || adder.id ? (
                  <a
                    target="_blank"
                    rel="external noopener noreferrer"
                    href={`https://open.spotify.com/user/${adder.id}`}
                  >
                    {adder.display_name || adder.id}
                  </a>
                ) : (
                  adder.display_name || adder.id
                )}
              </p>
            </div>
          </div>
          {track.url ? <TrackLink url={track.url} /> : <TrackLink id={track.id} />}
        </motion.article>
      )}
    </InView>
  );
};

export default Track;
