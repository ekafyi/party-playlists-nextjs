import { m as motion } from "framer-motion";
import dynamic from "next/dynamic";
import Link from "next/link";
import React from "react";
import { Loading } from ".";
import { HOME_THUMB_SIZES, TRANSPARENT_PX_IMG } from "../lib/constants";
import { buildSrcSet, getMediumImage } from "../lib/get-spotify-image";
import styles from "./CardInList.module.css";

interface ICardInListProps {
  title: string;
  subtitle?: string;
  slug: string;
  images: SpotifyApi.ImageObject[];
}

// Dynamically import component client-side.
// https://nextjs.org/docs/advanced-features/dynamic-import
const InView = dynamic(() => import("react-intersection-observer").then((obs) => obs.InView), {
  ssr: false,
});

const Img = (props) => {
  return <img sizes={HOME_THUMB_SIZES} alt="" width="200" height="200" {...props} />;
};

const CardInList: React.FunctionComponent<ICardInListProps> = (props) => {
  const { title, subtitle, images, slug } = props;

  const [navigating, setNavigating] = React.useState(false);

  return (
    // prettier-ignore
    <motion.div layoutId={`card-${title}`} layout>
      <motion.article layout className={`${styles.card} ${navigating ? styles["card--loading"] : ""}`}>
        {images.length ? (
          <>
            <motion.div layoutId={`thumb-${title}`} layout>
              {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
              {/* @ts-ignore */}
              <InView rootMargin="20px 20px 40px 20px" triggerOnce={true}>
                {({ inView, ref }) => (
                  <div className={styles.card__artwork} ref={ref}>
                    <Img
                      crossOrigin="anonymous"
                      src={inView ? getMediumImage(images).url : TRANSPARENT_PX_IMG}
                      className={inView ? "opacity-100" : "opacity-0"}
                      srcSet={buildSrcSet(images)}
                    />
                  </div>
                )}
              </InView>
              <div aria-hidden="true" className={`${styles.card__artwork} nojs-hidden`} />
            </motion.div>
            <noscript>
              <div className={styles.card__artwork}>
                <Img src={getMediumImage(images).url} srcSet={buildSrcSet(images)} />
              </div>
            </noscript>
          </>
        ) : (
          <img aria-hidden="true" src={TRANSPARENT_PX_IMG} width="200" height="200" />
        )}
        <Link href={slug} passHref>
          {/* prettier-ignore */}
          <a className="common-cover-parent" onClick={() => { setNavigating(true) }}>
            <h2 className={styles.card__title}>{title}</h2>
            <p className={styles.card__subtitle}>{subtitle || ""}</p>
          </a>
        </Link>
        {navigating && <Loading />}
      </motion.article>
    </motion.div>
  );
};

export default CardInList;
