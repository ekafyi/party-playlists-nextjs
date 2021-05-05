import { getSmallestImage } from "../lib/get-spotify-image";
import SpotifyTrackLink from "./SpotifyTrackLink";
import styles from "./Track.module.css";

interface ITrackProps {
  track: SpotifyApi.TrackObjectFull;
  adder: SpotifyApi.UserObjectPublic;
  trackNum: number;
}

const Track: React.FunctionComponent<ITrackProps> = ({ track, adder, trackNum }) => (
  <article className={styles.track} tabIndex={0}>
    <span className={styles.track__num}>{trackNum}</span>
    <div className={styles.track__artwork}>
      <img src={getSmallestImage(track.album.images).url} className="common-full-image" alt="" width="60" height="60" />
    </div>
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
