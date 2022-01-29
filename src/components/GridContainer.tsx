import type { ReactNode } from "react";
import styles from "./GridContainer.module.css";
import HomeHeader from "./HomeHeader";

interface GridContainerProps {
  children: ReactNode;
  withHomeHeader?: boolean;
}

const GridContainer = ({ children, withHomeHeader = true }: GridContainerProps) => {
  return (
    <main className={styles.container}>
      {withHomeHeader && <HomeHeader />}
      {children}
    </main>
  );
};

export default GridContainer;
