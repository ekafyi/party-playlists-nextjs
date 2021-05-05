import Link from "next/link";
import { getMediumImage } from "../lib/get-spotify-image";
import styles from "./CardInList.module.css";

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
      <div className={styles.card__artwork}>
        {/* <div className=""> */}
        {images.length && (
          <img
            src={getMediumImage(images).url}
            className="common-full-image"
            loading="lazy"
            alt=""
            width="200"
            height="200"
          />
        )}
        {/* </div> */}
      </div>
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
