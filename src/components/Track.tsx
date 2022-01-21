import dynamic from "next/dynamic";
import { TRANSPARENT_PX_IMG } from "../lib/constants";
import { getSmallestImage } from "../lib/get-spotify-image";
import SpotifyTrackLink from "./SpotifyTrackLink";
import styles from "./Track.module.css";

interface ITrackProps {
  track: SpotifyApi.TrackObjectFull;
  adder: SpotifyApi.UserObjectPublic;
  trackNum: number;
}

// Dynamically import component client-side.
// https://nextjs.org/docs/advanced-features/dynamic-import
const InView = dynamic(() => import("react-intersection-observer").then((obs) => obs.InView), {
  ssr: false,
});

const Track: React.FunctionComponent<ITrackProps> = ({ track, adder, trackNum }) => (
  <article className={styles.track} tabIndex={0}>
    <span className={styles.track__num}>{trackNum}</span>
    {track.album.images ? (
      <>
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-ignore */}
        <InView rootMargin="0px 0px 40px 0px" triggerOnce={true}>
          {({ inView, ref }) => (
            <div className={styles.track__artwork} ref={ref}>
              <img
                crossOrigin="anonymous"
                src={inView ? getSmallestImage(track.album.images).url : TRANSPARENT_PX_IMG}
                className={inView ? "opacity-100" : "opacity-0"}
                alt=""
                width="60"
                height="60"
              />
            </div>
          )}
        </InView>
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
          {` — added by: `}
          <a target="_blank" rel="external noopener noreferrer" href={`https://open.spotify.com/user/${adder.id}`}>
            {adder.id}
          </a>
        </p>
      </div>
    </div>
    <SpotifyTrackLink id={track.id} />
  </article>
);

export default Track;
