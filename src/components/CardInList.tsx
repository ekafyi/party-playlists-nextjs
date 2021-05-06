import dynamic from "next/dynamic";
import Link from "next/link";
import React from "react";
// import { InView } from "react-intersection-observer";
import { TRANSPARENT_PX_IMG } from "../lib/constants";
import { getMediumImage } from "../lib/get-spotify-image";
import styles from "./CardInList.module.css";
// import dynamic from "next/dynamic";
// import { getMediumImage } from "../lib/get-spotify-image";

const InView = dynamic(() => import("react-intersection-observer").then((obs) => obs.InView), {
  ssr: false,
});

interface ICardInListProps {
  title: string;
  subtitle?: string;
  slug: string;
  images: SpotifyApi.ImageObject[];
}

// const OtherComponent = dynamic(() => import("./OtherComponent"), { loading: () => <p>loading...</p> });

const CardInList: React.FunctionComponent<ICardInListProps> = (props) => {
  const { title, subtitle, images, slug } = props;

  return (
    <article className={styles.card}>
      <noscript>
        <div className={`pb-full ${styles.card__artwork}`}>
          <img src={getMediumImage(images).url} alt="" width="200" height="200" />
        </div>
      </noscript>
      {images.length ? (
        <>
          <InView>
            {({ inView, ref }) => (
              <div className={`pb-full ${styles.card__artwork}`} ref={ref}>
                <img
                  src={inView ? getMediumImage(images).url : TRANSPARENT_PX_IMG}
                  className={inView ? "opacity-100" : "opacity-0"}
                  alt=""
                  width="200"
                  height="200"
                />
              </div>
            )}
          </InView>
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
