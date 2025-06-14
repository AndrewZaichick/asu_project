import { ReactElement } from "react";

import Card from "@components/Card/Card";
import { laboratories, tests } from "@router/Links";
import { Link } from "react-router-dom";

import styles from "./mainpage.module.scss";

function MainPage(): ReactElement {
  return (
    <div className={styles.container}>
      <Link to={laboratories.path} className={styles.link}>
        <Card title={laboratories.title} />
      </Link>
      <Link to={tests.path} className={styles.link}>
        <Card title={tests.title} toolTipText={tests.toolTipText} />
      </Link>
    </div>
  );
}

export default MainPage;
