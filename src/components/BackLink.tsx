import Link from "next/link";
import styles from "./BackLink.module.css";

const BackLink: React.FunctionComponent = () => (
  <>
    <Link href="/" passHref>
      <a className={styles.anchor}>
        <div className="sr-only">Home</div>
      </a>
    </Link>
    <div aria-hidden="true" className={styles.arrow}>
      &larr;
    </div>
  </>
);

export default BackLink;
