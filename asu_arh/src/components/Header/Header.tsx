import { ReactElement } from "react";

import { Link } from "react-router-dom";

import logo from "../../assets/bru-logo.png";
import styles from "./header.module.scss";

function Header(): ReactElement {
  return (
    <header className={styles.container}>
      <div className={styles.wrapper}>
        <Link to="/" draggable={false}>
          <img src={logo} alt="logo" />
        </Link>
      </div>
      <div className={styles.wrapper}>
        <h1>Виртуальная лаборатория "Архитектура ЭВМ"</h1>
      </div>
    </header>
  );
}

export default Header;
