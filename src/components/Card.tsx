import { m as motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import type { MouseEvent } from "react";
import { PlaylistDescription, PlaylistImage, PlaylistTitle, PlaylistTracks, Share, SinglePlaylistWrapper } from ".";
import { getTrackCountText } from "../lib/str-helpers";
import styles from "./Card.module.css";

interface CardProps {
  listData: IPlaylistExcerpt;
  isExpanded?: boolean | "PLACEHOLDER";
  onNavigate?: (event: MouseEvent<HTMLAnchorElement>) => void;
  onTransitionComplete?: () => void;
  tracksData?: IPlaylistFull["tracks"]["items"];
}

const Card = ({
  listData,
  isExpanded = false,
  onNavigate,
  onTransitionComplete,
  tracksData = undefined,
}: CardProps) => {
  const lessMotion = useReducedMotion();

  return (
    <motion.article
      className={`${styles.card} ${isExpanded ? styles["card--expanded"] : ""}`}
      layoutId={lessMotion ? undefined : `${listData.name}`}
      onLayoutAnimationComplete={onTransitionComplete}
    >
      {isExpanded ? (
        <SinglePlaylistWrapper>
          <div data-area="thumb">
            <PlaylistImage content={listData.images} placement="SINGLE" />
            <motion.div className="top-72 mt-4 hidden lg:sticky lg:block" layout>
              <Share title={listData.name} />
            </motion.div>
          </div>

          <PlaylistTitle content={listData.name} placement="SINGLE" />

          <div data-area="description" className="lg:-mb-4">
            <PlaylistDescription
              content={listData.description}
              placement="SINGLE"
              singleOnlyContent={typeof tracksData !== "undefined" ? getTrackCountText(tracksData.length) : ""}
            />
          </div>

          <motion.div className="lg:hidden" data-area="cta" layout>
            <Share title={listData.name} />
          </motion.div>

          <PlaylistTracks data={tracksData} />
        </SinglePlaylistWrapper>
      ) : (
        <>
          <PlaylistImage content={listData.images} placement="LIST" />

          <Link href={`/${listData.slug}`} passHref>
            <a className={styles.card__link} href={`/${listData.slug}`} onClick={onNavigate}>
              <PlaylistTitle content={listData.name} placement="LIST" />
            </a>
          </Link>

          <PlaylistDescription content={listData.description} placement="LIST" />
        </>
      )}
    </motion.article>
  );
};

export default Card;
