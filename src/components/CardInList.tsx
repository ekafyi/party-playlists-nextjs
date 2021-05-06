import Link from "next/link";
import { SimpleImg } from "react-simple-img";
import { TRANSPARENT_PX_IMG } from "../lib/constants";
import { getMediumImage } from "../lib/get-spotify-image";
import styles from "./CardInList.module.css";
// import { SimpleImg } from "react-simple-img";

interface ICardInListProps {
  title: string;
  subtitle?: string;
  slug: string;
  images: SpotifyApi.ImageObject[];
}

const CardInList: React.FunctionComponent<ICardInListProps> = (props) => {
  const { title, subtitle, images, slug } = props;
  return (
    <article className={styles.card}>
      {images.length ? (
        <>
          {/* <div className={styles.card__artwork}>
            <img
              src={getMediumImage(images).url}
              className="common-full-image"
              loading="lazy"
              alt=""
              width="200"
              height="200"
            />
          </div> */}
          <SimpleImg
            src={getMediumImage(images).url}
            className={styles.card__artwork}
            width="200"
            height="200"
            applyAspectRatio={true}
            placeholder={TRANSPARENT_PX_IMG}
          />
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
