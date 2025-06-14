import { ReactElement } from "react";

import { IProps } from "./IProps";
import styles from "./container.module.scss";

function CacheContainer({ size, children }: IProps): ReactElement {
  return <div className={styles[size]}>{children}</div>;
}

export default CacheContainer;
