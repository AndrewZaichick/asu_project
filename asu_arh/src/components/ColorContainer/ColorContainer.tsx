import { ReactElement, ReactNode } from "react";

import { IProps } from "./IProps";
import styles from "./container.module.scss";

function ColorContainer({ children }: IProps): ReactElement {
  return <div className={styles.container}>{children}</div>;
}

export default ColorContainer;
