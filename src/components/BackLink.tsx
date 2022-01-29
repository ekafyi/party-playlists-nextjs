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
      <div className={styles.arrow}>&larr;</div>
    </motion.a>
  </Link>
);

export default BackLink;
