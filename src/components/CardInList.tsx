import { motion } from "framer-motion"; // eslint-ignore
import dynamic from "next/dynamic";
import Link from "next/link";
import React from "react";
import { HOME_THUMB_SIZES, TRANSPARENT_PX_IMG } from "../lib/constants";
import { buildSrcSet, getMediumImage } from "../lib/get-spotify-image";
import styles from "./CardInList.module.css";

// import { motion } from "framer-motion";

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
  return (
    <motion.article
      layoutId={`card-${title}`}
      layout
      // initial={false}
      // initial={{ opacity: 0 }}
      // animate={{ opacity: 1 }}
      // exit={{ opacity: 0 }}
      transition={{ delay: 0.2 }}
      className={styles.card}
    >
      {images.length ? (
        <>
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/* @ts-ignore */}
          <InView rootMargin="0px 0px 40px 0px" triggerOnce={true}>
            {({ inView, ref }) => (
              <motion.div layoutId={`thumb-${title}`} className={styles.card__artwork} ref={ref}>
                <Img
                  crossOrigin="anonymous"
                  src={inView ? getMediumImage(images).url : TRANSPARENT_PX_IMG}
                  className={inView ? "opacity-100" : "opacity-0"}
                  srcSet={buildSrcSet(images)}
                />
              </motion.div>
            )}
          </InView>
          <div aria-hidden="true" className={styles.card__artwork} />
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
        <a className="common-cover-parent">
          <h2 className={styles.card__title}>{title}</h2>
          <p className={styles.card__subtitle}>{subtitle || ""}</p>
        </a>
      </Link>
    </motion.article>
  );
};

export default CardInList;
