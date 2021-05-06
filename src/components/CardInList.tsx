import dynamic from "next/dynamic";
import Link from "next/link";
import React from "react";
import { HOME_THUMB_SIZES, TRANSPARENT_PX_IMG } from "../lib/constants";
import { getMediumImage } from "../lib/get-spotify-image";
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

const srcSet = `https://mosaic.scdn.co/640/ab67616d0000b2730ef84b82816687fc634c4910ab67616d0000b2735ddbd61ea4a6dab213cc97afab67616d0000b273aaac5479cd9db05e896db80fab67616d0000b273f9fe3333babc806530a8545a 640w, https://mosaic.scdn.co/300/ab67616d0000b2730ef84b82816687fc634c4910ab67616d0000b2735ddbd61ea4a6dab213cc97afab67616d0000b273aaac5479cd9db05e896db80fab67616d0000b273f9fe3333babc806530a8545a 300w`;

const CardInList: React.FunctionComponent<ICardInListProps> = (props) => {
  const { title, subtitle, images, slug } = props;
  return (
    <article className={styles.card}>
      {images.length ? (
        <>
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/* @ts-ignore */}
          <InView rootMargin="0px 0px 50px 0px">
            {({ inView, ref }) => (
              <div className={`pb-full ${styles.card__artwork}`} ref={ref}>
                <img
                  src={inView ? getMediumImage(images).url : TRANSPARENT_PX_IMG}
                  className={inView ? "opacity-100" : "opacity-0"}
                  srcSet={srcSet}
                  sizes={HOME_THUMB_SIZES}
                  alt=""
                  width="200"
                  height="200"
                />
              </div>
            )}
          </InView>
          <div aria-hidden="true" className={`pb-full ${styles.card__artwork}`} />
          <noscript>
            <div className={`pb-full ${styles.card__artwork}`}>
              <img src={getMediumImage(images).url} alt="" width="200" height="200" />
            </div>
          </noscript>
        </>
      ) : (
        <img aria-hidden="true" src={TRANSPARENT_PX_IMG} />
      )}
      <Link href={slug} passHref>
        <a className="common-cover-parent">
          <h2 className={styles.card__title}>{title}</h2>
          <p className={styles.card__subtitle}>{subtitle || ""}</p>
        </a>
      </Link>
    </article>
  );
};

export default CardInList;
