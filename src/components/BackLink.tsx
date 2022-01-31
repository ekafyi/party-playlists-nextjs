import { m as motion } from "framer-motion";
import Link from "next/link";
import styles from "./BackLink.module.css";

const BackLink: React.FunctionComponent = () => (
  <Link href="/" passHref>
    <motion.a
      aria-label="Home"
      className={`${styles.anchor} nojs-opacity-100`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={styles.arrow}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
      </svg>
    </motion.a>
  </Link>
);

export default BackLink;
