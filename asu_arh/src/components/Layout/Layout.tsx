import { ReactElement } from "react";

import { Outlet } from "react-router";

import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import styles from "./layout.module.scss";

function Layout(): ReactElement {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
      {/* <Footer /> */}
    </>
  );
}

export default Layout;
