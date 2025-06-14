import { ReactElement, useEffect, useLayoutEffect, useState } from "react";

import styles from "./footer.module.scss";

function Footer(): ReactElement {
  const [x, setX] = useState<number>(0);
  useLayoutEffect(() => {
    const handle = () =>
      setX(
        Math.max(
          document.body.scrollHeight,
          document.documentElement.scrollHeight,
          document.body.offsetHeight,
          document.documentElement.offsetHeight,
          document.body.clientHeight,
          document.documentElement.clientHeight,
        ),
      );
    document.addEventListener("resize", handle);
  });

  useEffect(() => {
    console.log(x);
  });

  return (
    <footer className={styles.container}>
      <div>
        <h2>Development by Skachinskii Nikita from ASOIZ-191</h2>
      </div>
    </footer>
  );
}

export default Footer;
