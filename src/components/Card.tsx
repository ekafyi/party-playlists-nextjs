import { m as motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import type { MouseEvent } from "react";
import { PlaylistDescription, PlaylistImage, PlaylistTitle, PlaylistTracks, Share, SinglePlaylistWrapper } from ".";
import { getTrackCountText } from "../lib/str-helpers";
import type { Optional } from "../lib/type-helpers";
import styles from "./Card.module.css";

interface CardProps {
  listData: { title: string; description: string; slug: string; images: SpotifyApi.SinglePlaylistResponse["images"] };
  isExpanded?: boolean | "PLACEHOLDER";
  onNavigate?: (event: MouseEvent<HTMLAnchorElement>) => void;
  fullData?: Optional<SpotifyApi.PlaylistObjectFull, | "collaborative" | "id" | "owner" | "public" | "followers" | "snapshot_id" | "type" | "href" | "uri" | "external_urls">; // prettier-ignore
}

const Card = ({ listData, isExpanded = false, onNavigate, fullData = undefined }: CardProps) => {
  const lessMotion = useReducedMotion();

  return (
    <motion.article
      className={`${styles.card} ${isExpanded ? styles["card--expanded"] : ""}`}
      layoutId={lessMotion ? undefined : `${listData.title}`}
    >
      {isExpanded ? (
        <SinglePlaylistWrapper>
          <div data-area="thumb">
            <PlaylistImage content={listData.images} placement="SINGLE" />
            <motion.div className="top-72 mt-4 hidden lg:sticky lg:block" layout>
              <Share title={listData.title} />
            </motion.div>
          </div>

          <PlaylistTitle content={listData.title} placement="SINGLE" />

          <div data-area="description" className="lg:-mb-4">
            <PlaylistDescription
              content={listData.description}
              placement="SINGLE"
              singleOnlyContent={typeof fullData !== "undefined" ? getTrackCountText(fullData.tracks.items.length) : ""}
            />
          </div>

          <motion.div className="lg:hidden" data-area="cta" layout>
            <Share title={listData.title} />
          </motion.div>

          <PlaylistTracks data={fullData} />
        </SinglePlaylistWrapper>
      ) : (
        <>
          <PlaylistImage content={listData.images} placement="LIST" />

          <Link href={`/${listData.slug}`} passHref>
            <a className={styles.card__link} href={`/${listData.slug}`} onClick={onNavigate}>
              <PlaylistTitle content={listData.title} placement="LIST" />
            </a>
          </Link>

          <PlaylistDescription content={listData.description} placement="LIST" />
        </>
      )}
    </motion.article>
  );
};

export default Card;
