import styles from "./HomeHeader.module.css";

const HomeHeader: React.FunctionComponent = () => (
  <header className={styles.header}>
    <h1 className={styles.header__title}>The Party Corgi Listening Party</h1>
    <p className={styles.header__desc}>
      Collaborative playlists from the <code>#listening-party</code> channel in the{" "}
      <a href="https://www.partycorgi.com/" target="_blank" rel="external noopener noreferrer">
        Party Corgi Discord
      </a>
    </p>
  </header>
);

export default HomeHeader;
