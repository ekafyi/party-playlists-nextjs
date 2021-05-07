import { RWebShare } from "react-web-share";
import { Track } from "../components";
import { PLAYLIST_THUMB_SIZES, TRANSPARENT_PX_IMG } from "../lib/constants";
import { buildSrcSet, getMediumImage } from "../lib/get-spotify-image";
import { replaceUnicode } from "../lib/str-helpers";
import type { Optional } from "../lib/type-helpers";
import styles from "./SinglePlaylist.module.css";

// import { RWebShare } from "react-web-share";

interface ISinglePlaylistProps {
  playlist: Optional<SpotifyApi.PlaylistObjectFull, | "collaborative" | "id" | "owner" | "public" | "followers" | "snapshot_id" | "type" | "href" | "uri" | "external_urls">; // prettier-ignore
}

const SinglePlaylist: React.FunctionComponent<ISinglePlaylistProps> = ({ playlist }) => {
  return (
    <main className={styles.playlist}>
      <div className={styles.playlist__artworkContainer}>
        <div className="sticky top-6 flex items-end sm:block">
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
          {/* FIXME */}
          <RWebShare
            data={{
              text: "",
              url: window.location.href || process.env.URL,
              title: playlist.name,
            }}
            onClick={() => console.log("shared successfully!")}
          >
            <button className="text-sm font-medium px-2 py-2 rounded hover:bg-gray-50 ml-4 sm:ml-0">Share</button>
          </RWebShare>
          {/* // */}
        </div>
      </div>
      <header className={styles.playlist__header}>
        <h1 className={styles.playlist__title}>{playlist.name}</h1>
        <p className="text-gray-700 text-sm mb-4">{replaceUnicode(playlist.description || "")}</p>
      </header>
      <section className={styles.playlist__tracks} aria-label="tracks">
        {/* {JSON.stringify(playlist.tracks.items)} */}
        {playlist.tracks.items.map(({ track, added_by }, index) => (
          <Track key={track.name} track={track} adder={added_by} trackNum={index + 1} />
        ))}
      </section>
    </main>
  );
};

export default SinglePlaylist;
