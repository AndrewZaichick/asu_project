import React, { ReactElement } from "react";

import { IProps } from "./IProps";
import styles from "./block.module.scss";

function ColorBlock({
  title,
  color,
  height = "30px",
  width = "60px",
}: IProps): ReactElement {
  return (
    <div className={styles.container}>
      <div
        className={styles.block}
        style={{
          width: width,
          height: height,
          backgroundColor: color,
        }}
      />
      {title}
    </div>
  );
}

export default ColorBlock;
